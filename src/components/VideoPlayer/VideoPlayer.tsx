import React from 'react'
import ReactPlayer from 'react-player'
import styles from './VideoPlayer.module.scss'

interface VideoProps {
	url: string
}

const VideoPlayer = ({ url }: VideoProps) => {
	return (
		<div className={styles['player-wrapper']}>
			<ReactPlayer
				className={styles['react-player']}
				url={url}
				controls={true}
				width='100%'
				height='100%'
			/>
		</div>
	)
}

export default VideoPlayer
