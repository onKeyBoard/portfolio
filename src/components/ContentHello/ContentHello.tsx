import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeProvider'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { RichTextContent } from '@graphcms/rich-text-types'
import SectionTitle from '../SectionTitle/SectionTitle'
import SocialLinksBlock from '../SocialLinksBlock/SocialLinksBlock'
import { getImageCustomWidth } from '../../utils/cloudinaryUtils'
import styles from './ContentHello.module.scss'
import { useQuery } from '@apollo/client'
import { GET_BIO } from '../../queries/bio.js'

interface ContentHelloData {
	profileImageUrl: string
	headline: string
	body: {
		raw: RichTextContent
	}
}

const ContentHello = () => {
	const { theme } = useContext(ThemeContext)
	const { loading, error, data } = useQuery(GET_BIO)
	if (loading) return <BlockyLoader />
	if (error) return <p>Error : {error.message}</p>
	const {
		profileImageUrl,
		headline,
		body: { raw: bodyContent },
	} = data.bio as ContentHelloData

	const ResizedProfileImageUrl = getImageCustomWidth(profileImageUrl, 400)

	return (
		<section className={styles['container']}>
			<div className={`${styles['profile_grid']} ${styles[theme]}`}>
				<div className={styles['photo']}>
					<div className={styles['profile_image']}>
						<img src={ResizedProfileImageUrl} alt='profile' />
					</div>
				</div>
				<div className={styles['info']}>
					<SocialLinksBlock theme={theme} />
				</div>
				<div className={styles['bio']}>
					<div className={styles['content']}>
						{headline && <SectionTitle text={headline} />}
						{bodyContent && <RichText content={bodyContent} />}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContentHello
