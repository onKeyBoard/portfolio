import React from 'react'
import styles from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

interface HeaderProps {
	toggledStyle: boolean
}

const Header = ({ toggledStyle }: HeaderProps) => {
	const headerClass = toggledStyle
		? `${styles['header']} ${styles['toggled']}`
		: `${styles['header']}`
	return (
		<header className={headerClass}>
			<div className={styles['title']}>
				<div className={styles['inner']}>
					<h1>Shawn Pavlas</h1>
					<h3>
						Software Engineer<sup>+</sup>
					</h3>
				</div>
			</div>

			<div className={styles['socials']}>
				<a href='https://www.linkedin.com/in/shawn-pavlas/' target='_blank'>
					<FontAwesomeIcon icon={faLinkedin} />
				</a>
			</div>
		</header>
	)
}

export default Header
