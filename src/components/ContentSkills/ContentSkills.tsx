import React from 'react'
import styles from './ContentSkills.module.scss'
import { useQuery } from '@apollo/client'
import { GET_SKILLS } from '../../queries/skills.js'
import { getImageCustomWidth } from '../../utils/cloudinaryUtils'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import SectionTitle from '../SectionTitle/SectionTitle'

interface Skill {
	id: string
	title: string
	iconUrl: string
}

const ContentSkills = () => {
	const { loading, error, data } = useQuery(GET_SKILLS)
	if (loading) return <BlockyLoader />
	if (error) return <p>Error : {error.message}</p>
	const { skills } = data

	return (
		<>
			<div className={styles['skills-headline']}>
				<SectionTitle text="I'm well-versed in these tools & technologies" />
			</div>
			<div className={styles['grid']}>
				{skills.map(({ id, title, iconUrl }: Skill) => (
					<div key={id} className={styles['card']}>
						<div className={styles['icon']}>
							<img src={getImageCustomWidth(iconUrl, 200)} alt={title} />
						</div>
						<h3 className={styles['title']}>{title}</h3>
					</div>
				))}
			</div>
		</>
	)
}

export default ContentSkills
