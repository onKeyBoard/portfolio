import React from 'react'
import ProjectGrid from '../ProjectGrid/ProjectGrid'
import styles from './SectionWork.module.scss'

const SectionWork = () => {
	return (
		<section id='work' className={styles['section']}>
			<div className={styles['inner']}>
				<ProjectGrid title='Professional Work' category='Professional' sectionId='work' carousel />
			</div>
		</section>
	)
}

export default SectionWork
