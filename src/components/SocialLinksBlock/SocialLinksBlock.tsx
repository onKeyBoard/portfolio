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

interface SocialLinksProps {
	name: string
	icon: string
	url: string
	index: number
}

const SocialLinksBlock = () => {
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
			url: 'instagram.com/shawnpavlas',
		},
	] as SocialLinksProps[]

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
		<div className={styles['container']}>
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
					<FontAwesomeIcon icon={faLocationDot} /> Colorado, USA
				</b>
			</div>
		</div>
	)
}

export default SocialLinksBlock
