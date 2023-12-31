import styles from './ProjectCard.module.scss'

const ProjectCard = ({ title, imageUrl, year, active, handleClick }) => {
	return (
		<button
			className={`${styles['card']} ${active ? styles['active'] : ''}`}
			onClick={handleClick}
		>
			<div className={styles['content']}>
				<div className={styles['image-container']}>
					<img src={imageUrl} alt={title} />
				</div>
				<div className={styles['overlay']}>
					<h2>{title}</h2>
					<div className={styles['year']}>
						<b>{year}</b>
					</div>
				</div>
			</div>
		</button>
	)
}

export default ProjectCard
