import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import useSectionReveal from '../../hooks/useSectionReveal'
import useMediaQuery from '../../hooks/useMediaQuery'
import { skillCategories } from '../../data/skills'
import type { Skill } from '../../data/skills'
import CategoryCard from '../CategoryCard/CategoryCard'
import SkillCard from '../SkillCard/SkillCard'
import styles from './SectionSkills.module.scss'

const HOVER_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 900px)'

const findCategory = (id: string | null) =>
	skillCategories.find((c) => c.id === id) ?? null

const PreviewSkills = ({ skills }: { skills: Skill[] }) => (
	<ul className={styles['previewSkills']}>
		{skills.map((skill) => (
			<SkillCard key={skill.id} skill={skill} compact />
		))}
	</ul>
)

const SectionSkills = () => {
	const { isMounted, isExiting } = useSectionReveal('skills')
	const hoverMode = useMediaQuery(HOVER_QUERY)
	const [previewId, setPreviewId] = useState<string | null>(null)
	const [openId, setOpenId] = useState<string | null>(null)
	const [pinnedId, setPinnedId] = useState<string | null>(null)
	const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({})
	const backRef = useRef<HTMLButtonElement>(null)
	const returnFocusId = useRef<string | null>(null)

	const preview = findCategory(previewId ?? pinnedId)
	const open = findCategory(openId)

	useEffect(() => {
		if (isMounted) return
		setPreviewId(null)
		setOpenId(null)
		setPinnedId(null)
	}, [isMounted])

	useEffect(() => {
		setPinnedId(null)
	}, [hoverMode])

	useEffect(() => {
		if (open) {
			backRef.current?.focus()
		} else if (returnFocusId.current) {
			cardRefs.current[returnFocusId.current]?.focus()
			returnFocusId.current = null
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [openId])

	const openCategory = (id: string) => {
		setPreviewId(null)
		setOpenId(id)
	}

	const togglePin = (id: string) => {
		setPinnedId((current) => (current === id ? null : id))
	}

	const goBack = () => {
		returnFocusId.current = openId
		setOpenId(null)
	}

	const handleGridBlur = (event: React.FocusEvent<HTMLUListElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
			setPreviewId(null)
		}
	}

	return (
		<section id='skills' className={styles['section']}>
			<div className={styles['inner']}>
				{isMounted && (
					<div
						className={`${styles['explorer']} ${
							isExiting ? styles['exiting'] : ''
						}`}
					>
						<div
							className={`${styles['panel']} ${
								hoverMode ? styles['panelHover'] : ''
							}`}
						>
							{hoverMode && !open && (
								<div className={styles['sizer']} aria-hidden='true'>
									{skillCategories.map((category) => (
										<div key={category.id}>
											<p className={styles['panelTitle']}>
												{category.title}
												<span className={styles['panelMeta']}>
													{category.skills.length} skills
												</span>
											</p>
											<PreviewSkills skills={category.skills} />
										</div>
									))}
								</div>
							)}

							<div>
								<h2
									className={
										preview || open
											? styles['visuallyHidden']
											: styles['headline']
									}
								>
									Skills across design and engineering.
								</h2>

								{!preview && !open && (
									<p className={styles['hint']}>
										{hoverMode
											? 'Hover a category to see its skills.'
											: 'Tap a category to explore it.'}
									</p>
								)}

								{open && (
									<div key={open.id} className={styles['fade']}>
										<button
											ref={backRef}
											type='button'
											className={styles['back']}
											onClick={goBack}
										>
											<FontAwesomeIcon icon={faArrowLeft} />
											Back to all skills
										</button>
										<h3 className={styles['panelTitle']}>
											{open.title}
											<span className={styles['panelMeta']}>
												{open.skills.length} skills
											</span>
										</h3>
										<p className={styles['panelText']}>{open.summary}</p>
									</div>
								)}

								<div aria-live='polite'>
									{preview && !open && (
										<div key={preview.id} className={styles['fade']}>
											<p className={styles['panelTitle']}>
												{preview.title}
												<span className={styles['panelMeta']}>
													{preview.skills.length} skills
												</span>
											</p>
											<PreviewSkills skills={preview.skills} />
										</div>
									)}
								</div>
							</div>
						</div>

						{open ? (
							<ul key={open.id} className={styles['skills']}>
								{open.skills.map((skill) => (
									<SkillCard key={skill.id} skill={skill} />
								))}
							</ul>
						) : (
							<ul
								className={styles['categories']}
								onMouseLeave={hoverMode ? () => setPreviewId(null) : undefined}
								onBlur={hoverMode ? handleGridBlur : undefined}
							>
								{skillCategories.map((category) => (
									<CategoryCard
										key={category.id}
										ref={(el) => {
											cardRefs.current[category.id] = el
										}}
										category={category}
										showSummary={!hoverMode}
										showArrow={!hoverMode}
										selected={hoverMode ? pinnedId === category.id : undefined}
										onPreview={hoverMode ? setPreviewId : undefined}
										onOpen={hoverMode ? togglePin : openCategory}
									/>
								))}
							</ul>
						)}
					</div>
				)}
			</div>
		</section>
	)
}

export default SectionSkills
