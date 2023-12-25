import BlockyLoader from '../BlockyLoader/BlockyLoader.jsx'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import styles from './ProfileOverview.module.scss'
import { useQuery } from '@apollo/client'
import { GET_BIO } from '../../queries/bio.js'

const ProfileOverview = () => {
	const { loading, error, data } = useQuery(GET_BIO)
	if (loading) return <BlockyLoader />
	if (error) return <p>Error : {error.message}</p>
	const {
		profileImageUrl,
		headline,
		body: { raw: bodyContent },
	} = data.bio

	return (
		<section className={styles['profile_grid']}>
			<div className={styles['photo']}>
				<div className={styles['profile_image']}>
					<img src={profileImageUrl} alt='profile' />
				</div>
			</div>
			<div className={styles['info']}>
				<b>Github: @onKeyBoard</b>
				<b>Location: Colorado, USA</b>
			</div>
			<div className={styles['bio']}>
				<div className={styles['content']}>
					{headline && <h3>{headline}</h3>}
					{bodyContent && <RichText content={bodyContent} />}
				</div>
			</div>
		</section>
	)
}

export default ProfileOverview
