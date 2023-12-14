import BlockyLoader from '../BlockyLoader/BlockyLoader.jsx'
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
		body: { text },
	} = data.bio

	return (
		<section className={styles['profile']}>
			<div className={styles['profile_grid']}>
				<div className={styles['left']}>
					<div className={styles['profile_image']}>
						<img src={profileImageUrl} alt='profile' />
					</div>
				</div>
				<div className={styles['right']}>
					<div className={styles['content']}>
						{headline && <h3>{headline}</h3>}
						{text && text}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ProfileOverview
