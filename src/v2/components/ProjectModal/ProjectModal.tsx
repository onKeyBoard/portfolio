import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChevronLeft,
	faChevronRight,
	faXmark,
} from '@fortawesome/free-solid-svg-icons'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useProjectModal } from '../../context/ProjectModalContext'
import {
	isVideo,
	getCloudinaryImage,
	getCloudinarySrcSet,
} from '../../../utils/cloudinaryUtils'
import { getVisitLinkLabel } from '../../utils/linkLabel'
import styles from './ProjectModal.module.scss'

const SLIDE_WIDTHS = [640, 1024, 1600, 2200]

const VideoPlayer = dynamic(
	() => import('../../../components/VideoPlayer/VideoPlayer'),
	{ ssr: false }
)

const ProjectModal = () => {
	const { activeProject, closeProject } = useProjectModal()
	const [slideIndex, setSlideIndex] = useState(0)
	const closeButtonRef = useRef<HTMLButtonElement>(null)

	const slides = activeProject?.projectSlides ?? []
	const totalSlides = slides.length
	const activeSlide = slides[slideIndex]

	useEffect(() => {
		if (!activeProject) return
		setSlideIndex(0)
		closeButtonRef.current?.focus()
	}, [activeProject])

	useEffect(() => {
		if (!activeProject) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeProject()
			} else if (event.key === 'ArrowLeft') {
				setSlideIndex((index) => Math.max(index - 1, 0))
			} else if (event.key === 'ArrowRight') {
				setSlideIndex((index) => Math.min(index + 1, totalSlides - 1))
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [activeProject, closeProject, totalSlides])

	if (!activeProject) return null

	const { title, year, type, description, link } = activeProject

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) closeProject()
	}

	return (
		<div
			className={styles['overlay']}
			onClick={handleOverlayClick}
			role='presentation'
		>
			<div
				className={styles['dialog']}
				role='dialog'
				aria-modal='true'
				aria-label={title}
			>
				<div className={styles['backBar']}>
					<button
						type='button'
						className={styles['backButton']}
						onClick={closeProject}
					>
						<FontAwesomeIcon icon={faChevronLeft} />
						<span>Back to projects</span>
					</button>
				</div>

				<button
					ref={closeButtonRef}
					type='button'
					className={styles['close']}
					aria-label='Close project'
					onClick={closeProject}
				>
					<FontAwesomeIcon icon={faXmark} />
				</button>

				<div className={styles['overview']}>
					{type?.length > 0 && (
						<ul className={styles['typeList']}>
							{type.map((item) => (
								<li key={item} className={styles['typeItem']}>
									{item}
								</li>
							))}
						</ul>
					)}
					<h2 className={styles['title']}>{title}</h2>
					{year && <p className={styles['year']}>{year}</p>}
					{description && (
						<p className={styles['description']}>{description}</p>
					)}
					{link && (
						<a
							className={styles['visitLink']}
							href={link}
							target='_blank'
							rel='noreferrer'
						>
							<span className={styles['visitLinkInner']}>
								{getVisitLinkLabel(link)}
							</span>
						</a>
					)}
				</div>

				<div className={styles['stage']}>
					{activeSlide?.imageUrl &&
						(isVideo(activeSlide.imageUrl) ? (
							<div className={styles['slideVideo']}>
								<VideoPlayer url={activeSlide.imageUrl} status />
							</div>
						) : (
							<div className={styles['slideImageWrap']}>
								<Zoom
									zoomImg={{
										src: getCloudinaryImage(activeSlide.imageUrl, 2560),
									}}
									classDialog={styles['zoomDialog']}
								>
									<img
										className={styles['slideImage']}
										src={getCloudinaryImage(activeSlide.imageUrl, 1600)}
										srcSet={getCloudinarySrcSet(
											activeSlide.imageUrl,
											SLIDE_WIDTHS
										)}
										sizes='(max-width: 760px) 100vw, min(1100px, 70vw)'
										alt={activeSlide.title || title}
									/>
								</Zoom>
							</div>
						))}

					{(activeSlide?.title || activeSlide?.description) && (
						<div className={styles['slideInfo']}>
							{activeSlide.title && <h3>{activeSlide.title}</h3>}
							{activeSlide.description && <p>{activeSlide.description}</p>}
						</div>
					)}

					{totalSlides > 1 && (
						<div className={styles['controls']}>
							<button
								type='button'
								className={styles['arrow']}
								aria-label='Previous slide'
								onClick={() =>
									setSlideIndex((index) => Math.max(index - 1, 0))
								}
								disabled={slideIndex === 0}
							>
								<FontAwesomeIcon icon={faChevronLeft} />
							</button>
							<span className={styles['slideCount']}>
								{slideIndex + 1} / {totalSlides}
							</span>
							<button
								type='button'
								className={styles['arrow']}
								aria-label='Next slide'
								onClick={() =>
									setSlideIndex((index) =>
										Math.min(index + 1, totalSlides - 1)
									)
								}
								disabled={slideIndex === totalSlides - 1}
							>
								<FontAwesomeIcon icon={faChevronRight} />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProjectModal
