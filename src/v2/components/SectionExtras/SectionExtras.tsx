import React from 'react'
import ProjectGrid from '../ProjectGrid/ProjectGrid'
import styles from './SectionExtras.module.scss'

const SectionExtras = () => {
	return (
		<section id='extras' className={styles['section']}>
			<div className={styles['inner']}>
				<h2 className={styles['title']}>Extras</h2>
				<ProjectGrid category='Personal' sectionId='extras' />
			</div>
		</section>
	)
}

export default SectionExtras
