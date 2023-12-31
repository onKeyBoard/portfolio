import styles from './ProjectCarouselSlide.module.scss'

const ProjectCarouselSlide = ({ imageUrl, title, description, active }) => {
	const slideStatusClass = active ? styles['slide'] : styles['slide-inactive']
	return (
		<div className={slideStatusClass}>
			<div className={styles['image']}>
				<img src={imageUrl} alt={title} />
			</div>
			<div className={styles['info']}>
				<h5>{title}</h5>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default ProjectCarouselSlide
