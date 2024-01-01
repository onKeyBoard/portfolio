import React from 'react'
import styles from './ProjectCarouselSlide.module.scss'
import Zoom from 'react-medium-image-zoom'
import { isVideo } from '../../utils/cloudinaryUtils'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
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
	const renderMedia = () => {
		if (isVideo(imageUrl)) {
			return (
				<div>
					<VideoPlayer url={imageUrl} />
				</div>
			)
		} else {
			return (
				<Zoom>
					<img src={imageUrl} alt={title} />
				</Zoom>
			)
		}
	}
	return (
		<div className={slideStatusClass}>
			<div className={styles['image']}>{renderMedia()}</div>
			<div className={styles['info']}>
				<h5>{title}</h5>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default ProjectCarouselSlide
