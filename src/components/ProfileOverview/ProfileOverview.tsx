import React from 'react'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { RichTextContent } from '@graphcms/rich-text-types'
import SectionTitle from '../SectionTitle/SectionTitle'
import SocialLinksBlock from '../SocialLinksBlock/SocialLinksBlock'
import styles from './ProfileOverview.module.scss'
import { useQuery } from '@apollo/client'
import { GET_BIO } from '../../queries/bio.js'

interface ProfileOverviewData {
	profileImageUrl: string
	headline: string
	body: {
		raw: RichTextContent
	}
}

const ProfileOverview = () => {
	const { loading, error, data } = useQuery(GET_BIO)
	if (loading) return <BlockyLoader />
	if (error) return <p>Error : {error.message}</p>
	const {
		profileImageUrl,
		headline,
		body: { raw: bodyContent },
	} = data.bio as ProfileOverviewData

	return (
		<section className={styles['profile_grid']}>
			<div className={styles['photo']}>
				<div className={styles['profile_image']}>
					<img src={profileImageUrl} alt='profile' />
				</div>
			</div>
			<div className={styles['info']}>
				<SocialLinksBlock />
			</div>
			<div className={styles['bio']}>
				<div className={styles['content']}>
					{headline && <SectionTitle text={headline} />}
					{bodyContent && <RichText content={bodyContent} />}
				</div>
			</div>
		</section>
	)
}

export default ProfileOverview
