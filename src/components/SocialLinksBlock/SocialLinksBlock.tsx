import React from 'react'
import styles from './SocialLinksBlock.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
	faGithub,
	faLinkedin,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

interface SocialLinksData {
	name: string
	icon: string
	url: string
	index: number
}

interface SocialLinksBlockProps {
	theme: string
}

const SocialLinksBlock = ({ theme }: SocialLinksBlockProps) => {
	// To Do - Move this data to the database
	const data = [
		{
			name: 'Github',
			icon: 'faGithub',
			url: 'github.com/onKeyBoard',
		},
		{
			name: 'LinkedIn',
			icon: 'faLinkedin',
			url: 'linkedin.com/in/shawn-pavlas',
		},
		{
			name: 'Instagram',
			icon: 'faInstagram',
			url: 'instagram.com/shawn.joseph.pictures',
		},
	] as SocialLinksData[]

	const getIcon = (iconName: string): IconDefinition => {
		switch (iconName) {
			case 'faGithub':
				return faGithub
			case 'faLinkedin':
				return faLinkedin
			case 'faInstagram':
				return faInstagram
			default:
				return faGithub
		}
	}

	return (
		<div className={`${styles['container']} ${styles[theme]}`}>
			{data.map(({ name, icon, url }, index) => (
				<li key={index} className={styles['item']}>
					<a
						href={`https://${url}`}
						target='_blank'
						aria-label={`${name} link`}
					>
						<div className={styles['icon']}>
							<FontAwesomeIcon icon={getIcon(icon)} />
						</div>
					</a>
				</li>
			))}
			<div className={styles['location']}>
				<b>
					<FontAwesomeIcon icon={faLocationDot} /> Colorado
				</b>
			</div>
		</div>
	)
}

export default SocialLinksBlock
