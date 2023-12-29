import styles from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

const Header = ({ toggledStyle }) => {
	const headerClass = toggledStyle
		? `${styles['header']} ${styles['toggled']}`
		: `${styles['header']}`
	return (
		<header className={headerClass}>
			<div className={styles['title']}>
				<div className={styles['inner']}>
					<h1>Shawn Pavlas</h1>
					<h3>
						Front End Engineer<sup>+</sup>
					</h3>
				</div>
			</div>

			<div className={styles['socials']}>
				<a href='https://github.com/onKeyBoard' target='_blank'>
					<FontAwesomeIcon icon={faGithub} />
				</a>
				<a href='https://www.linkedin.com/in/shawn-pavlas/' target='_blank'>
					<FontAwesomeIcon icon={faLinkedin} />
				</a>
			</div>
		</header>
	)
}

export default Header
