import React from 'react'
import styles from './ExperienceSection.module.scss'
import ProjectShowcase from '../ProjectShowcase/ProjectShowcase'

const ExperienceSection = () => {
	return (
		<div className={styles['container']}>
			<ProjectShowcase category='Professional' />
		</div>
	)
}

export default ExperienceSection
