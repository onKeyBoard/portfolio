import styles from './ProjectCarousel.module.scss'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../../queries/projects.js'
import ProjectCarouselSlide from '../ProjectCarouselSlide/ProjectCarouselSlide'
import Button from '../Button/Button'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import ButtonUnstyled from '../ButtonUnstyled/ButtonUnstyled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAngleLeft,
	faAngleRight,
	faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

interface ProjectCarouselProps {
	projectId: string
	theme: string
	handleBackButton: () => void
}

const ProjectCarousel = ({
	projectId,
	theme,
	handleBackButton,
}: ProjectCarouselProps) => {
	// If there is no projectId, return null
	// This component should only be rendered when a project is selected
	if (!projectId) return null

	// Get the project from the database
	const { loading, error, data } = useQuery(GET_PROJECT, {
		variables: { id: projectId },
		skip: !projectId,
	})

	// Manage the current slide index
	const [currentSlide, setCurrentSlide] = useState(0)
	const [startOfSlides, setStartOfSlides] = useState(true)
	const [endOfSlides, setEndOfSlides] = useState(false)

	// Handle slide change events
	const handleSlideChange = (direction: 'prev' | 'next') => {
		let newSlide = currentSlide

		if (direction === 'prev' && currentSlide > 0) {
			newSlide = currentSlide - 1
		} else if (
			direction === 'next' &&
			currentSlide < projectSlides.length - 1
		) {
			newSlide = currentSlide + 1
		}

		setStartOfSlides(newSlide === 0)
		setEndOfSlides(newSlide === projectSlides.length - 1)
		setCurrentSlide(newSlide)
	}

	if (loading) return <BlockyLoader />
	if (error) return <p>Error : {error.message}</p>

	const { project } = data
	const { title, year, type, description, link, projectSlides } = project

	const totalSlides = projectSlides.length

	const carouselOverviewContent = (
		<div className={styles['carousel-overview']}>
			<h2>{title}</h2>
			{year && (
				<div className={styles['year']}>
					<b>{year}</b>
				</div>
			)}
			{type && (
				<ul className={styles['type-list']}>
					{type.map((type: string, index: number) => (
						<li className={styles['type-item']} key={index}>
							{type}
						</li>
					))}
				</ul>
			)}
			{description && (
				<div className={styles['description']}>
					<p>{description}</p>
				</div>
			)}
			{link && (
				<a href={link} target='_blank' rel='noopener noreferrer'>
					<Button text='View Project' theme={theme} />
				</a>
			)}
			<ButtonUnstyled handleClick={handleBackButton}>
				<div className={`${styles['go-back']} ${styles[theme]}`}>
					<div className={styles['icon-group']}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</div>
				</div>
			</ButtonUnstyled>
		</div>
	)

	return (
		<section className={styles['carousel']}>
			{carouselOverviewContent}
			<div className={styles['slide-container']}>
				<div className={styles['slides']}>
					{projectSlides.map(
						({ id, imageUrl, title, description }, index: number) => (
							<ProjectCarouselSlide
								active={currentSlide === index}
								key={id}
								theme={theme}
								imageUrl={imageUrl}
								title={title}
								description={description}
							/>
						)
					)}
				</div>
				{totalSlides >= 2 && (
					<div className={`${styles['controls']} ${styles[theme]}`}>
						<button
							onClick={() => handleSlideChange('prev')}
							disabled={startOfSlides ? true : undefined}
						>
							<FontAwesomeIcon icon={faAngleLeft} />
						</button>
						<h5 className={styles['slide-count']}>
							{currentSlide + 1} / {totalSlides}
						</h5>
						<button
							onClick={() => handleSlideChange('next')}
							disabled={endOfSlides ? true : undefined}
						>
							<FontAwesomeIcon icon={faAngleRight} />
						</button>
					</div>
				)}
			</div>
		</section>
	)
}

export default ProjectCarousel
