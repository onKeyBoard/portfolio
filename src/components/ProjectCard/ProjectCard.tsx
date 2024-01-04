import React from 'react'
import styles from './ProjectCard.module.scss'
import { getImageCustomWidth } from '../../utils/cloudinaryUtils'

interface ProjectCardProps {
	title: string
	imageUrl: string
	year: string
	active: boolean
	handleClick: () => void
}

const ProjectCard = ({
	title,
	imageUrl,
	year,
	active,
	handleClick,
}: ProjectCardProps) => {
	const thumbnailUrl = getImageCustomWidth(imageUrl, 400)

	return (
		<button
			className={`${styles['card']} ${active ? styles['active'] : ''}`}
			onClick={handleClick}
		>
			<div className={styles['content']}>
				<div className={styles['image-container']}>
					<img src={thumbnailUrl} alt={title} />
				</div>
				<div className={styles['overlay']}>
					<h3>{title}</h3>
					<div className={styles['year']}>
						<b>{year}</b>
					</div>
				</div>
			</div>
		</button>
	)
}

export default ProjectCard
