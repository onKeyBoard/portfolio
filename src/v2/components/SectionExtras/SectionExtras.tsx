import React from 'react'
import ProjectGrid from '../ProjectGrid/ProjectGrid'
import styles from './SectionExtras.module.scss'

const SectionExtras = () => {
	return (
		<section id='extras' className={styles['section']}>
			<div className={styles['inner']}>
				<ProjectGrid title='Personal Projects' category='Personal' sectionId='extras' />
			</div>
		</section>
	)
}

export default SectionExtras
