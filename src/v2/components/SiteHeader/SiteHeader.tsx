import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import {
	useActiveSectionId,
	useSectionNavigation,
} from '../../context/ActiveSectionContext'
import styles from './SiteHeader.module.scss'

const NAV_LINKS = [
	{ href: '/#hello', label: 'Hello', id: 'hello' },
	{ href: '/#skills', label: 'Skills', id: 'skills' },
	{ href: '/#work', label: 'Work', id: 'work' },
	{ href: '/#extras', label: 'Extras', id: 'extras' },
]

const SiteHeader = () => {
	const activeId = useActiveSectionId()
	const navigateToSection = useSectionNavigation()

	const handleNavClick =
		(id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
			if (
				event.button !== 0 ||
				event.metaKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.altKey
			) {
				return
			}
			if (!document.getElementById(id)) return

			event.preventDefault()
			navigateToSection(id, true)
		}

	const revealed = activeId === null || (activeId !== '' && activeId !== 'top')

	const revealedClass = revealed ? styles['revealed'] : ''

	const navLinks = () => [
		<a
			key='/#top'
			className={`${styles['profileLink']} ${
				activeId === 'top' ? styles['active'] : ''
			}`}
			href='/#top'
			aria-label='Back to top'
			aria-current={activeId === 'top' ? 'true' : undefined}
			onClick={handleNavClick('top')}
		>
			<FontAwesomeIcon icon={faCircleUser} />
		</a>,
		...NAV_LINKS.map(({ href, label, id }) => (
			<a
				key={href}
				className={`${styles['navLink']} ${
					activeId === id ? styles['active'] : ''
				}`}
				href={href}
				aria-current={activeId === id ? 'true' : undefined}
				onClick={handleNavClick(id)}
			>
				{label}
			</a>
		)),
	]

	return (
		<header className={styles['root']}>
			<div
				className={`v2-top-line ${revealed ? 'revealed' : ''}`}
				aria-hidden='true'
			/>
			<div className={styles['bar']}>
				<div className={`${styles['leftStrip']} ${revealedClass}`}>
					<a
						className={styles['name']}
						href='/#top'
						onClick={handleNavClick('top')}
					>
						Shawn Pavlas
					</a>
					<span className={styles['title']}>UX Designer + Engineer</span>
				</div>
				<div className={`${styles['rightStrip']} ${revealedClass}`}>
					<nav className={styles['nav']} aria-label='Primary'>
						{navLinks()}
					</nav>
				</div>
			</div>

			<div className={`${styles['mobileBar']} ${revealedClass}`}>
				<nav className={styles['mobileNav']} aria-label='Primary'>
					{navLinks()}
				</nav>
			</div>
		</header>
	)
}

export default SiteHeader
