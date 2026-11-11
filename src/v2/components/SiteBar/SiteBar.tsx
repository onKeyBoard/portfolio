import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import {
	faGithub,
	faLinkedin,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import {
	useActiveSectionId,
	useSectionNavigation,
} from '../../context/ActiveSectionContext'
import styles from './SiteBar.module.scss'

const NAV_LINKS = [
	{ href: '/#hello', label: 'Hello', id: 'hello' },
	{ href: '/#skills', label: 'Skills', id: 'skills' },
	{ href: '/#work', label: 'Work', id: 'work' },
	{ href: '/#extras', label: 'Extras', id: 'extras' },
]

const SOCIAL_LINKS = [
	{ name: 'GitHub', icon: faGithub, url: 'https://github.com/onKeyBoard' },
	{
		name: 'LinkedIn',
		icon: faLinkedin,
		url: 'https://linkedin.com/in/shawn-pavlas',
	},
	{
		name: 'Instagram',
		icon: faInstagram,
		url: 'https://instagram.com/shawn.joseph.pictures',
	},
]

const SiteBar = () => {
	const activeId = useActiveSectionId()
	const navigateToSection = useSectionNavigation()
	const onHero = activeId === 'top'

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
			event.preventDefault()
			navigateToSection(id)
		}

	const navLink = ({ href, label, id }: (typeof NAV_LINKS)[number]) => (
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
	)

	return (
		<footer className={`${styles['bar']} ${onHero ? styles['onHero'] : ''}`}>
			<div className={styles['glow']} aria-hidden='true' />
			<div className={styles['inner']}>
				<Link
					className={styles['identity']}
					href='/#top'
					onClick={handleNavClick('top')}
				>
					<span className={styles['name']}>Shawn Pavlas</span>
					<span className={styles['title']}>UX Designer + Engineer</span>
				</Link>

				<nav className={styles['nav']} aria-label='Primary'>
					{NAV_LINKS.map(navLink)}
				</nav>

				<nav className={styles['social']} aria-label='Social links'>
					{SOCIAL_LINKS.map(({ name, icon, url }) => (
						<a
							key={name}
							className={styles['socialIcon']}
							href={url}
							target='_blank'
							rel='noreferrer'
							aria-label={name}
						>
							<FontAwesomeIcon icon={icon} />
						</a>
					))}
				</nav>
			</div>

			<nav className={styles['mobileNav']} aria-label='Primary'>
				<Link
					className={styles['profileLink']}
					href='/#top'
					aria-label='Back to top'
					onClick={handleNavClick('top')}
				>
					<FontAwesomeIcon icon={faCircleUser} />
				</Link>
				{NAV_LINKS.map(navLink)}
			</nav>
		</footer>
	)
}

export default SiteBar
