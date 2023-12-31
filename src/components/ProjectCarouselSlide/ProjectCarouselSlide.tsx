import React from 'react'
import styles from './ProjectCarouselSlide.module.scss'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface ProjectCarouselSlideProps {
	imageUrl: string
	title: string
	description: string
	active: boolean
}

const ProjectCarouselSlide = ({
	imageUrl,
	title,
	description,
	active,
}: ProjectCarouselSlideProps) => {
	const slideStatusClass = active ? styles['slide'] : styles['slide-inactive']
	return (
		<div className={slideStatusClass}>
			<div className={styles['image']}>
				<Zoom>
					<img src={imageUrl} alt={title} />
				</Zoom>
			</div>
			<div className={styles['info']}>
				<h5>{title}</h5>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default ProjectCarouselSlide
