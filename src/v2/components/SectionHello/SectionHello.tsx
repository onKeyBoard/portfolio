import React from 'react'
import { useQuery } from '@apollo/client'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faGithub,
	faLinkedin,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { GET_BIO } from '../../../queries/bio.js'
import useSectionReveal from '../../hooks/useSectionReveal'
import styles from './SectionHello.module.scss'
import { placeholderBio } from '../../data/placeholder'

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

const SectionHello = () => {
	const { data, loading, error } = useQuery(GET_BIO)
	const { isMounted, isExiting } = useSectionReveal('hello')
	const bio = !loading && !error && data?.bio ? data.bio : null

	const headline = bio?.headline ?? placeholderBio.headline
	const profileImageUrl = bio?.profileImageUrl

	return (
		<section id='hello' className={styles['section']}>
			<div className={styles['inner']}>
				<div
					className={`${styles['grid']} ${
						isExiting ? styles['exiting'] : ''
					}`}
				>
					{isMounted && (
						<>
							<div className={styles['photoColumn']}>
								<div className={styles['photo']}>
									{profileImageUrl && (
										<img
											className={styles['photoImage']}
											src={profileImageUrl}
											alt='Shawn Pavlas'
										/>
									)}
								</div>
								<div className={styles['info']}>
									<div className={styles['social']}>
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
									</div>
									<div className={styles['location']}>
										<FontAwesomeIcon icon={faLocationDot} /> Colorado
									</div>
								</div>
							</div>
							<div className={styles['content']}>
								<h2 className={styles['headline']}>{headline}</h2>
								<div className={styles['body']}>
									{bio?.body?.raw ? (
										<RichText content={bio.body.raw} />
									) : (
										<p>{placeholderBio.bodyText}</p>
									)}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	)
}

export default SectionHello
