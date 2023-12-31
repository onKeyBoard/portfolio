import styles from './ContentExtras.module.scss'
import React from 'react'
import ProjectShowcase from '../ProjectShowcase/ProjectShowcase'

const ContentExtras = () => {
	return (
		<div className={styles['content-extras']}>
			<ProjectShowcase category='Personal' />
		</div>
	)
}

export default ContentExtras
