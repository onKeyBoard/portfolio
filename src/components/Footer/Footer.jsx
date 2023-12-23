import styles from './Footer.module.scss'

const Footer = ({ toggledStyle }) => {
	const footerClass = toggledStyle
		? `${styles['footer']} ${styles['toggled']}`
		: `${styles['footer']}`
	return (
		<footer className={footerClass}>
			<div className={styles['content']}>
				<div className={styles['info']}>
					<h4>Built with React & NextJS.</h4>
				</div>
				<div className={styles['copyright']}>
					<h4>© 2023</h4>
				</div>
			</div>
		</footer>
	)
}

export default Footer
