import styles from './InfoList.module.scss'

const InfoList = ({ title, content }) => {
	return (
		<div className={styles['info-list']}>
			<h3>
				<i>{title}</i>
			</h3>
			<ul>
				{content.map((item, index) =>
					index !== content.length - 1 ? (
						<li key={index}>{item}, </li>
					) : (
						<li key={index}>{item}</li>
					)
				)}
			</ul>
		</div>
	)
}

export default InfoList
