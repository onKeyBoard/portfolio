import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowLeft,
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {
	isVideo,
	getCloudinaryImage,
	getCloudinarySrcSet,
} from '../../../utils/cloudinaryUtils'
import { getVisitLinkLabel } from '../../utils/linkLabel'
import styles from './ProjectDetail.module.scss'

export interface ProjectSlide {
	id: string
	title: string
	description: string
	imageUrl: string
}

export interface Project {
	id: string
	type: string[]
	year: string
	title: string
	description: string
	imageUrl: string
	link: string
	projectSlides?: ProjectSlide[]
}

const SLIDE_WIDTHS = [640, 1024, 1600, 2200]

const VideoPlayer = dynamic(
	() => import('../../../components/VideoPlayer/VideoPlayer'),
	{ ssr: false }
)

interface ProjectDetailProps {
	project: Project
	onBack: () => void
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
	const [slideIndex, setSlideIndex] = useState(0)

	const { title, year, description, link } = project
	const slides = project.projectSlides ?? []
	const totalSlides = slides.length
	const activeSlide = slides[slideIndex]

	useEffect(() => {
		setSlideIndex(0)
	}, [project.id])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (document.querySelector('[data-rmiz-modal-overlay="visible"]')) return
			if (event.key === 'Escape') {
				onBack()
			} else if (event.key === 'ArrowLeft') {
				setSlideIndex((index) => Math.max(index - 1, 0))
			} else if (event.key === 'ArrowRight') {
				setSlideIndex((index) => Math.min(index + 1, totalSlides - 1))
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onBack, totalSlides])

	return (
		<article className={styles['detail']} aria-label={title}>
			<div className={styles['panel']}>
				<div className={styles['overview']}>
					<h3 className={styles['title']}>{title}</h3>
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
					<figure className={styles['figure']}>
						<div className={styles['frame']}>
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
												sizes='(max-width: 760px) 100vw, min(1000px, 65vw)'
												alt={activeSlide.title || title}
											/>
										</Zoom>
									</div>
								))}
						</div>
						{slides.some((slide) => slide.title || slide.description) && (
							<figcaption className={styles['caption']}>
								{slides.map((slide, index) => (
									<div
										key={slide.id ?? index}
										className={styles['captionItem']}
										data-active={index === slideIndex}
										aria-hidden={index !== slideIndex}
									>
										{slide.title && <h4>{slide.title}</h4>}
										{slide.description && <p>{slide.description}</p>}
									</div>
								))}
							</figcaption>
						)}
					</figure>

					{totalSlides > 1 && (
						<nav className={styles['controls']} aria-label='Slides'>
							<button
								type='button'
								className={styles['arrow']}
								aria-label='Previous slide'
								onClick={() => setSlideIndex((index) => Math.max(index - 1, 0))}
								disabled={slideIndex === 0}
							>
								<FontAwesomeIcon icon={faChevronLeft} />
							</button>
							<div className={styles['dots']}>
								{slides.map((slide, index) => (
									<button
										key={slide.id ?? index}
										type='button'
										className={styles['dot']}
										aria-label={`Slide ${index + 1} of ${totalSlides}`}
										aria-current={index === slideIndex ? 'true' : undefined}
										onClick={() => setSlideIndex(index)}
									/>
								))}
							</div>
							<button
								type='button'
								className={styles['arrow']}
								aria-label='Next slide'
								onClick={() =>
									setSlideIndex((index) => Math.min(index + 1, totalSlides - 1))
								}
								disabled={slideIndex === totalSlides - 1}
							>
								<FontAwesomeIcon icon={faChevronRight} />
							</button>
						</nav>
					)}
				</div>
			</div>
		</article>
	)
}

interface ProjectDetailHeaderProps {
	project: Project
	onBack: () => void
}

export const ProjectDetailHeader = ({
	project,
	onBack,
}: ProjectDetailHeaderProps) => {
	const backRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		backRef.current?.focus({ preventScroll: true })
	}, [project.id])

	return (
		<div className={styles['header']}>
			<button
				ref={backRef}
				type='button'
				className={styles['back']}
				onClick={onBack}
			>
				<FontAwesomeIcon icon={faArrowLeft} />
				Back to all projects
			</button>
			{project.type?.length > 0 && (
				<ul className={styles['typeList']}>
					{project.type.map((item) => (
						<li key={item} className={styles['typeItem']}>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default ProjectDetail
