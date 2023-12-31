import React from 'react'
import styles from './SectionTitleBanner.module.scss'
import SectionTitle from '../SectionTitle/SectionTitle'

interface SectionTitleBannerProps {
	text: string
}

const SectionTitleBanner = ({ text }: SectionTitleBannerProps) => {
	return (
		<div className={styles['wrapper']}>
			<div className={styles['headline']}>
				<SectionTitle text={text} />
			</div>
		</div>
	)
}

export default SectionTitleBanner
