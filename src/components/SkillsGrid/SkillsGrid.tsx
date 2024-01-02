import React from 'react'
import styles from './SkillsGrid.module.scss'
import { useQuery } from '@apollo/client'
import { GET_SKILLS } from '../../queries/skills.js'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import SectionTitleBanner from '../SectionTitleBanner/SectionTitleBanner'

const SkillsGrid = () => {
	const { loading, error, data } = useQuery(GET_SKILLS)
	if (loading) return <BlockyLoader />
	if (error) return <p>Error : {error.message}</p>
	const { skills } = data

	return (
		<>
			<SectionTitleBanner text="I'm well-versed in these tools & technologies" />
			<div className={styles['grid']}>
				{skills.map(({ id, title, iconUrl }) => (
					<div key={id} className={styles['card']}>
						<div className={styles['icon']}>
							<img src={iconUrl} alt={title} />
						</div>
						<h3 className={styles['title']}>{title}</h3>
					</div>
				))}
			</div>
		</>
	)
}

export default SkillsGrid
