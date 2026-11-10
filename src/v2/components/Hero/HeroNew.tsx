import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowRight,
	faUser,
	faLayerGroup,
	faBriefcase,
	faFlask,
} from '@fortawesome/free-solid-svg-icons'
import {
	faGithub,
	faLinkedin,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import {
	useActiveSectionId,
	useSectionNavigation,
} from '../../context/ActiveSectionContext'
import useSectionReveal from '../../hooks/useSectionReveal'
import styles from './Hero.module.scss'

const CTA_LINKS = [
	{ href: '#hello', label: 'Learn more about me', id: 'hello', icon: faUser },
	{
		href: '#skills',
		label: 'Explore my skill set',
		id: 'skills',
		icon: faLayerGroup,
	},
	{
		href: '#work',
		label: 'View my professional work',
		id: 'work',
		icon: faBriefcase,
	},
	{
		href: '#extras',
		label: 'Check out some side projects',
		id: 'extras',
		icon: faFlask,
	},
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

const Hero = () => {
	const activeId = useActiveSectionId()
	const navigateToSection = useSectionNavigation()
	const heroActive = activeId === 'top'
	const { isMounted, isExiting } = useSectionReveal('top')

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
		navigateToSection(id, true)
	}

	return (
		<section id='top' className={styles['hero']}>
			<div
				className={`${styles['frame']} ${
					heroActive ? styles['frameActive'] : ''
				}`}
				aria-hidden='true'
			>
				<div className={styles['frameInner']} />
			</div>
			<div className={styles['main']}>
				<div
					className={`${styles['inner']} ${
						isExiting ? styles['exiting'] : ''
					}`}
				>
					{isMounted && (
					<div className={styles['layout']}>
						<div className={styles['graphic']} aria-hidden='true'>
							<div className={styles['wireStage']}>
								<div
									className={`${styles['wireWindow']} ${styles['wireWindowA']}`}
								>
									<div className={styles['wireWindowInner']}>
										<div className={styles['wireBar']}>
											<span className={styles['wireCtrl']} />
											<span className={styles['wireCtrl']} />
											<span className={styles['wireLabel']}>POWERED BY COFFEE</span>
										</div>
										<div className={styles['wireBody']}>
											<div
												className={`${styles['wireLine']} ${styles['wireLineW70']}`}
											/>
											<div
												className={`${styles['wireLine']} ${styles['wireLineW45']}`}
											/>
											<div className={styles['wireImage']} />
										</div>
										<div className={styles['wireScan']} />
									</div>
								</div>
								<div
									className={`${styles['wireWindow']} ${styles['wireWindowB']}`}
								>
									<div className={styles['wireWindowInner']}>
										<div className={styles['wireBar']}>
											<span className={styles['wireCtrl']} />
											<span className={styles['wireCtrl']} />
											<span className={styles['wireLabel']}>INSPIRED BY HUMANS</span>
										</div>
										<div className={styles['wireBody']}>
											<div className={styles['wireImage']} />
											<div
												className={`${styles['wireLine']} ${styles['wireLineW70']}`}
											/>
											<div className={styles['wireButton']}>VIEW</div>
										</div>
									</div>
								</div>
								<div className={styles['wireCursor']}>
									<div className={styles['wireRipple']} />
									<svg viewBox='0 0 10 9'>
										<path d='M5 0L10 9H0Z' fill='currentColor' />
									</svg>
								</div>
							</div>
						</div>
						<div className={styles['content']}>
							<span className={styles['nameLine']}>Shawn Pavlas</span>
							<h1 className={styles['titleLine']}>
								UX <span className={styles['titleAccent']}>Designer</span>{' '}
								+ Engineer
							</h1>
							<p className={styles['blurb']}>
								<b>Human-centric</b> design, grounded in <b>research</b>, driven by <b>empathy</b>. My goal: understand people and craft products that feel effortless to use.</p>
							<nav className={styles['ctaGroup']} aria-label='Primary'>
								{CTA_LINKS.map(({ href, label, id, icon }) => (
									<a
										key={href}
										className={styles['cta']}
										href={href}
										aria-current={activeId === id ? 'true' : undefined}
										onClick={handleNavClick(id)}
									>
										<span className={styles['ctaInner']}>
											<span className={styles['ctaLabel']}>
												<FontAwesomeIcon
													className={styles['ctaIcon']}
													icon={icon}
												/>
												{label}
											</span>
											<FontAwesomeIcon
												className={styles['ctaArrow']}
												icon={faArrowRight}
											/>
										</span>
									</a>
								))}
							</nav>
						</div>
					</div>
				)}
			</div>
			</div>
			<div className={styles['heroFooter']}>
				<div className={styles['heroFooterInner']}>
					{isMounted && (
					<nav
						className={`${styles['heroSocial']} ${
							isExiting ? styles['exiting'] : ''
						}`}
						aria-label='Social links'
					>
						{SOCIAL_LINKS.map(({ name, icon, url }) => (
							<a
								key={name}
								className={styles['heroSocialIcon']}
								href={url}
								target='_blank'
								rel='noreferrer'
								aria-label={name}
							>
								<FontAwesomeIcon icon={icon} />
							</a>
						))}
					</nav>
					)}
				</div>
			</div>
		</section>
	)
}

export default Hero