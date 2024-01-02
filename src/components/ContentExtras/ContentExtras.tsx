import styles from './ContentExtras.module.scss'
import React from 'react'
import ProjectBrowser from '../ProjectBrowser/ProjectBrowser'

const ContentExtras = () => {
	return (
		<div className={styles['content-extras']}>
			<ProjectBrowser category='Personal' />
		</div>
	)
}

export default ContentExtras
