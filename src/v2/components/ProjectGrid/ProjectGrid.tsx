import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { GET_PROJECTS } from '../../../queries/projects.js'
import useSectionReveal from '../../hooks/useSectionReveal'
import ProjectDetail, {
	Project,
	ProjectDetailHeader,
} from '../ProjectDetail/ProjectDetail'
import NavCard from '../NavCard/NavCard'
import styles from './ProjectGrid.module.scss'
import { placeholderProjects } from '../../data/placeholder'

const SLIDE_DURATION = 600
const MOBILE_FADE_OUT = 200
const DESKTOP_QUERY = '(min-width: 641px)'
const MIN_EDGE_SPACE = 32
const LINE_TO_CONTENT = 36
const MIN_DETAIL_HEIGHT = 360

type Transition = 'opening' | 'closing' | null

// React 18's types don't know `inert` yet.
const inertProps = (isInert: boolean) =>
	(isInert ? { inert: '' } : {}) as React.HTMLAttributes<HTMLDivElement>

interface ProjectGridProps {
	title: string
	category: 'Professional' | 'Personal'
	sectionId: string
	carousel?: boolean
}

const ProjectGrid = ({
	title,
	category,
	sectionId,
	carousel,
}: ProjectGridProps) => {
	const { data, loading, error } = useQuery(GET_PROJECTS, {
		variables: { category },
	})
	const projects: Project[] =
		!loading && !error && data?.projects?.length
			? data.projects
			: placeholderProjects

	const { isMounted, isExiting } = useSectionReveal(sectionId)
	const [mode, setMode] = useState<'grid' | 'detail'>('grid')
	const [project, setProject] = useState<Project | null>(null)
	const [transition, setTransition] = useState<Transition>(null)
	const [anchor, setAnchor] = useState<{
		top: number
		detailMax: number
	} | null>(null)

	const headRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const scrollerRef = useRef<HTMLDivElement>(null)
	const gridLayerRef = useRef<HTMLDivElement>(null)
	const returnFocusId = useRef<string | null>(null)
	const timerRef = useRef<number>()
	const scrollTimerRef = useRef<number>()
	const gridScrollRef = useRef(0)
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(false)

	const getSection = () => document.getElementById(sectionId)

	const runTransition = (next: Transition, done?: () => void) => {
		window.clearTimeout(timerRef.current)
		setTransition(next)
		timerRef.current = window.setTimeout(() => {
			setTransition(null)
			done?.()
		}, SLIDE_DURATION)
	}

	const scrollSectionTo = (top: number) => {
		window.clearTimeout(scrollTimerRef.current)
		const section = getSection()
		if (!section) return
		const isDesktop = window.matchMedia(DESKTOP_QUERY).matches
		if (isDesktop) {
			section.scrollTop = top
			return
		}
		scrollTimerRef.current = window.setTimeout(() => {
			section.scrollTop = top
		}, MOBILE_FADE_OUT)
	}

	useEffect(
		() => () => {
			window.clearTimeout(timerRef.current)
			window.clearTimeout(scrollTimerRef.current)
		},
		[]
	)

	useEffect(() => {
		if (isMounted) return
		window.clearTimeout(timerRef.current)
		setMode('grid')
		setProject(null)
		setTransition(null)
	}, [isMounted])

	const updateAnchor = useCallback(() => {
		const section = getSection()
		const head = headRef.current
		const gridLayer = gridLayerRef.current
		if (!section || !head || !gridLayer) return
		if (!window.matchMedia(DESKTOP_QUERY).matches) {
			setAnchor(null)
			return
		}

		const gridViewHeight = head.offsetHeight + 2 + gridLayer.offsetHeight
		const available =
			section.clientHeight - parseFloat(getComputedStyle(section).paddingBottom)
		const top = Math.round(
			Math.max(MIN_EDGE_SPACE, (available - gridViewHeight) / 2)
		)
		const lineBottom = top + head.offsetHeight + 2
		const detailMax = Math.round(
			Math.max(
				MIN_DETAIL_HEIGHT,
				available - lineBottom - LINE_TO_CONTENT - MIN_EDGE_SPACE
			)
		)
		setAnchor((prev) =>
			prev && prev.top === top && prev.detailMax === detailMax
				? prev
				: { top, detailMax }
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sectionId])

	useLayoutEffect(() => {
		if (isMounted) updateAnchor()
	}, [isMounted, projects, updateAnchor])

	useEffect(() => {
		if (!isMounted) return
		updateAnchor()
		document.fonts?.ready.then(updateAnchor)
		window.addEventListener('load', updateAnchor)
		const observer = new ResizeObserver(() => updateAnchor())
		if (gridLayerRef.current) observer.observe(gridLayerRef.current)
		if (headRef.current) observer.observe(headRef.current)
		window.addEventListener('resize', updateAnchor)
		return () => {
			observer.disconnect()
			window.removeEventListener('load', updateAnchor)
			window.removeEventListener('resize', updateAnchor)
		}
	}, [isMounted, updateAnchor])

	useEffect(() => {
		if (mode !== 'grid' || !returnFocusId.current) return
		containerRef.current
			?.querySelector<HTMLAnchorElement>(
				`a[href="/projects?id=${returnFocusId.current}"]`
			)
			?.focus({ preventScroll: true })
		returnFocusId.current = null
	}, [mode])

	const openProject = (next: Project) => {
		setProject(next)
		setMode('detail')
		runTransition('opening')
		gridScrollRef.current = getSection()?.scrollTop ?? 0
		scrollSectionTo(0)
	}

	const closeProject = useCallback(() => {
		if (mode !== 'detail') return
		returnFocusId.current = project?.id ?? null
		setMode('grid')
		runTransition('closing', () => setProject(null))
		scrollSectionTo(gridScrollRef.current)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode, project])

	useEffect(() => {
		if (!carousel || !isMounted || mode !== 'grid') return
		const scroller = scrollerRef.current
		if (!scroller) return

		const updateEdges = () => {
			const { scrollLeft, scrollWidth, clientWidth } = scroller
			setCanScrollLeft(scrollLeft > 1)
			setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
		}

		updateEdges()
		scroller.addEventListener('scroll', updateEdges, { passive: true })
		window.addEventListener('resize', updateEdges)

		return () => {
			scroller.removeEventListener('scroll', updateEdges)
			window.removeEventListener('resize', updateEdges)
		}
	}, [carousel, isMounted, mode, projects.length])

	if (!isMounted) return null

	const handleCardClick =
		(target: Project) => (event: React.MouseEvent<HTMLAnchorElement>) => {
			if (
				event.button !== 0 ||
				event.metaKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.altKey
			) {
				return
			}
			event.preventDefault()
			openProject(target)
		}

	const scrollByCard = (direction: 1 | -1) => {
		const scroller = scrollerRef.current
		const card = scroller?.firstElementChild as HTMLElement | null
		if (!scroller || !card) return

		const gap = parseFloat(getComputedStyle(scroller).columnGap || '0')
		scroller.scrollBy({
			left: direction * (card.getBoundingClientRect().width + gap),
			behavior: 'smooth',
		})
	}

	const gridLayerState =
		mode === 'grid'
			? transition === 'closing'
				? styles['enterFromLeft']
				: ''
			: transition === 'opening'
			? styles['exitToLeft']
			: styles['hidden']
	const detailLayerState =
		mode === 'detail'
			? transition === 'opening'
				? styles['enterFromRight']
				: ''
			: styles['exitToRight']
	const gridInert = mode !== 'grid'
	const detailInert = mode !== 'detail'

	const cards = projects.map((item) => (
		<NavCard
			key={item.id}
			title={item.title}
			meta={item.year}
			imageUrl={item.imageUrl || undefined}
			description={item.description}
			href={`/projects?id=${item.id}`}
			onClick={handleCardClick(item)}
		/>
	))

	const gridBody = !carousel ? (
		<div ref={containerRef} className={styles['grid']}>
			{cards}
		</div>
	) : (
		<div ref={containerRef} className={styles['carouselWrap']}>
			<button
				type='button'
				className={`${styles['arrow']} ${styles['arrowLeft']}`}
				aria-label='Scroll projects left'
				onClick={() => scrollByCard(-1)}
				disabled={!canScrollLeft}
			>
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>
			<div
				ref={scrollerRef}
				className={`${styles['grid']} ${styles['carousel']}`}
			>
				{cards}
			</div>
			<button
				type='button'
				className={`${styles['arrow']} ${styles['arrowRight']}`}
				aria-label='Scroll projects right'
				onClick={() => scrollByCard(1)}
				disabled={!canScrollRight}
			>
				<FontAwesomeIcon icon={faChevronRight} />
			</button>
			<div
				className={`${styles['edgeFade']} ${styles['edgeFadeLeft']}`}
				style={{ opacity: canScrollLeft ? 1 : 0 }}
				aria-hidden='true'
			/>
			<div
				className={`${styles['edgeFade']} ${styles['edgeFadeRight']}`}
				style={{ opacity: canScrollRight ? 1 : 0 }}
				aria-hidden='true'
			/>
		</div>
	)

	const anchorStyle = anchor
		? ({
				marginTop: anchor.top,
				'--detail-max': `${anchor.detailMax}px`,
		  } as React.CSSProperties)
		: undefined

	return (
		<div
			className={`${styles['showcase']} ${isExiting ? styles['exiting'] : ''}`}
			data-anchored={anchor ? '' : undefined}
			style={anchorStyle}
		>
			<div ref={headRef} className={styles['head']}>
				<div
					className={`${styles['layer']} ${gridLayerState.replace(
						styles['hidden'],
						styles['invisible']
					)}`}
					{...inertProps(gridInert)}
					aria-hidden={gridInert || undefined}
				>
					<h2 className={styles['heading']}>{title}</h2>
				</div>
				{project && (
					<div
						key={project.id}
						className={`${styles['layer']} ${detailLayerState}`}
						{...inertProps(detailInert)}
						aria-hidden={detailInert || undefined}
					>
						<ProjectDetailHeader project={project} onBack={closeProject} />
					</div>
				)}
			</div>

			<div className={styles['divider']} aria-hidden='true' />

			<div className={styles['body']}>
				<div
					ref={gridLayerRef}
					className={`${styles['layer']} ${
						carousel ? styles['gridLayerCarousel'] : styles['gridLayer']
					} ${gridLayerState}`}
					{...inertProps(gridInert)}
					aria-hidden={gridInert || undefined}
				>
					{gridBody}
				</div>
				{project && (
					<div
						key={project.id}
						className={`${styles['layer']} ${styles['detailLayer']} ${detailLayerState}`}
						{...inertProps(detailInert)}
						aria-hidden={detailInert || undefined}
					>
						<ProjectDetail project={project} onBack={closeProject} />
					</div>
				)}
			</div>
		</div>
	)
}

export default ProjectGrid
