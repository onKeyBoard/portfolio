import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { GET_PROJECTS } from '../../../queries/projects.js'
import useSectionReveal from '../../hooks/useSectionReveal'
import { useProjectModal } from '../../context/ProjectModalContext'
import NavCard from '../NavCard/NavCard'
import styles from './ProjectGrid.module.scss'
import { placeholderProjects } from '../../data/placeholder'

interface ProjectSlide {
	id: string
	title: string
	description: string
	imageUrl: string
}

interface Project {
	id: string
	type: string[]
	year: string
	title: string
	description: string
	imageUrl: string
	link: string
	projectSlides?: ProjectSlide[]
}

interface ProjectGridProps {
	category: 'Professional' | 'Personal'
	sectionId: string
	carousel?: boolean
}

const ProjectGrid = ({ category, sectionId, carousel }: ProjectGridProps) => {
	const { data, loading, error } = useQuery(GET_PROJECTS, {
		variables: { category },
	})
	const projects: Project[] =
		!loading && !error && data?.projects?.length
			? data.projects
			: placeholderProjects

	const { isMounted, isExiting } = useSectionReveal(sectionId)
	const { openProject } = useProjectModal()
	const scrollerRef = useRef<HTMLDivElement>(null)
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(false)

	useEffect(() => {
		if (!carousel || !isMounted) return
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
	}, [carousel, isMounted, projects.length])

	const handleCardClick =
		(project: Project) => (event: React.MouseEvent<HTMLAnchorElement>) => {
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
			openProject(project)
		}

	const cards = isMounted
		? projects.map((project) => (
				<NavCard
					key={project.id}
					title={project.title}
					meta={project.year}
					imageUrl={project.imageUrl || undefined}
					description={project.description}
					href={`/projects?id=${project.id}`}
					onClick={handleCardClick(project)}
				/>
		  ))
		: null

	const gridClassName = `${styles['grid']} ${
		isExiting ? styles['exiting'] : ''
	}`

	if (!carousel) {
		return <div className={gridClassName}>{cards}</div>
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

	return (
		<div className={styles['carouselWrap']}>
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
				className={`${gridClassName} ${styles['carousel']}`}
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
}

export default ProjectGrid
