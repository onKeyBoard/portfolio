import styles from './SectionTitle.module.scss'

const SectionTitle = ({ text }) => {
	return (
		<div className={styles['title']}>
			<h2>{text}</h2>
		</div>
	)
}

export default SectionTitle
