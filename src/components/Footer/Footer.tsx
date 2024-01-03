import React from 'react'
import styles from './Footer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons'

interface FooterProps {
	toggledStyle: boolean
}

const Footer = ({ toggledStyle }: FooterProps) => {
	const footerClass = toggledStyle
		? `${styles['footer']} ${styles['toggled']}`
		: `${styles['footer']}`
	return (
		<footer className={footerClass}>
			<div className={styles['content']}>
				<div className={styles['info']}>
					<FontAwesomeIcon icon={faReact} />
					<h4>Built with React/TypeScript</h4>
				</div>
				<div className={styles['copyright']}>
					<h4>© 2024</h4>
				</div>
			</div>
		</footer>
	)
}

export default Footer
