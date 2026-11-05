import React from 'react'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import styles from './SiteFooter.module.scss'

const SiteFooter = () => {
	return (
		<footer className={styles['footer']}>
			<span>© {new Date().getFullYear()} Shawn Pavlas</span>
			<div className={styles['actions']}>
				<a
					className={styles['link']}
					href='https://www.linkedin.com/in/shawn-pavlas/'
					target='_blank'
					rel='noreferrer'
				>
					LinkedIn
				</a>
				<ThemeToggle />
			</div>
		</footer>
	)
}

export default SiteFooter
