import React from 'react'
import styles from './BlockyLoader.module.scss'

const BlockyLoader = () => {
	return (
		<div className={styles['wrapper']}>
			<div className={styles['blocky-loader']}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default BlockyLoader
