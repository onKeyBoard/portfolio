import React from 'react'
import styles from './SectionTitle.module.scss'

interface SectionTitleProps {
	text: string
}

const SectionTitle = ({ text }: SectionTitleProps) => {
	return (
		<div className={styles['title']}>
			<h2>{text}</h2>
		</div>
	)
}

export default SectionTitle
