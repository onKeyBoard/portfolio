import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_SKILLS } from '../../../queries/skills.js'
import useSectionReveal from '../../hooks/useSectionReveal'
import styles from './SectionSkills.module.scss'
import { placeholderSkills } from '../../data/placeholder'

interface Skill {
	id: string
	title: string
	iconUrl: string
}

const SectionSkills = () => {
	const { data, loading, error } = useQuery(GET_SKILLS)
	const skills: Skill[] =
		!loading && !error && data?.skills?.length ? data.skills : placeholderSkills

	const { isMounted, isExiting } = useSectionReveal('skills')

	return (
		<section id='skills' className={styles['section']}>
			<div className={styles['inner']}>
				{isMounted && (
					<h2
						className={`${styles['title']} ${
							isExiting ? styles['exiting'] : ''
						}`}
					>
						Tools and technologies I’ve worked with.
					</h2>
				)}
				<ul
					className={`${styles['list']} ${
						isExiting ? styles['exiting'] : ''
					}`}
				>
					{isMounted &&
						skills.map(({ id, title, iconUrl }) => (
							<li key={id} className={styles['row']}>
								{iconUrl && (
									<img className={styles['icon']} src={iconUrl} alt='' />
								)}
								<span className={styles['name']}>{title}</span>
							</li>
						))}
				</ul>
			</div>
		</section>
	)
}

export default SectionSkills
