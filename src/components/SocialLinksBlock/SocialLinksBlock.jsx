import styles from './SocialLinksBlock.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faGithub,
	faLinkedin,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

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
	]

	const getIcon = (iconName) => {
		switch (iconName) {
			case 'faGithub':
				return faGithub
			case 'faLinkedin':
				return faLinkedin
			case 'faInstagram':
				return faInstagram
		}
	}

	return (
		<div className={styles['container']}>
			{data.map(({ name, icon, url, index }) => (
				<li key={index} className={styles['item']}>
					<a
						href={`https://${url}`}
						target='_blank'
						aria-label={`${name} link`}
					>
						<div className={styles['icon']}>
							<FontAwesomeIcon icon={getIcon(icon)} alt={name} />
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
