import React from 'react'
import styles from './ProjectCarouselSlide.module.scss'
import Zoom from 'react-medium-image-zoom'
import { isVideo, getImageCustomWidth } from '../../utils/cloudinaryUtils'
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
	// conditionally render slide class
	const slideStatusClass = active ? styles['slide'] : styles['slide-inactive']
	// conditionally render video or image
	const renderMedia = () => {
		if (isVideo(imageUrl)) {
			return (
				<div>
					<VideoPlayer url={imageUrl} status={active} />
				</div>
			)
		} else {
			return (
				<Zoom zoomImg={{ src: imageUrl }} classDialog={styles['zoom-custom']}>
					<img src={getImageCustomWidth(imageUrl, 1500)} alt={title} />
				</Zoom>
			)
		}
	}
	// conditionally render title and description
	const renderInfo = () => {
		if (title || description) {
			return (
				<div className={styles['info']}>
					{title && <h5>{title}</h5>}
					{description && <p>{description}</p>}
				</div>
			)
		}
	}

	return (
		<div className={slideStatusClass}>
			<div className={styles['image']}>{renderMedia()}</div>
			<div className={styles['info']}>{renderInfo()}</div>
		</div>
	)
}

export default ProjectCarouselSlide
