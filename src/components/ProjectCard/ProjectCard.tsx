import React from 'react'
import styles from './ProjectCard.module.scss'
import { getImageCustomWidth } from '../../utils/cloudinaryUtils'

interface ProjectCardProps {
	title: string
	theme: string
	imageUrl: string
	year: string
	handleClick: () => void
}

const ProjectCard = ({
	title,
	theme,
	imageUrl,
	year,
	handleClick,
}: ProjectCardProps) => {
	const thumbnailUrl = getImageCustomWidth(imageUrl, 400)

	return (
		<button
			className={`${styles['card']} ${styles[theme]}`}
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
