import styles from './ExperienceCard.module.scss'

const ExperienceCard = ({ company, title, dates, description, imageUrl }) => {
	return (
		<div className={styles['card']}>
			<div className={styles['image-container']}>
				<img src={imageUrl} alt={title} />
			</div>
			<div className={styles['content']}>
				<h3>{company}</h3>
				<h2>{title}</h2>
				<b>{dates}</b>
				<div className={styles['description']}>
					<h3>Areas of Focus</h3>
					<p>{description}</p>
				</div>
			</div>
		</div>
	)
}

export default ExperienceCard
