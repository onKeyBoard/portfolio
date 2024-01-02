import React from 'react'
import styles from './ExperienceSection.module.scss'
import ProjectBrowser from '../ProjectBrowser/ProjectBrowser'

const ExperienceSection = () => {
	return (
		<div className={styles['container']}>
			<ProjectBrowser category='Professional' />
		</div>
	)
}

export default ExperienceSection
