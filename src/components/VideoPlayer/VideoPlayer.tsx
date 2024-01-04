import React, { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import styles from './VideoPlayer.module.scss'

interface VideoProps {
	url: string
	status?: boolean
}

const VideoPlayer = ({ url, status }: VideoProps) => {
	const playerRef = useRef<ReactPlayer>(null)

	useEffect(() => {
		if (status) {
			playerRef.current?.seekTo(0)
		}
	}, [status])

	return (
		<div className={styles['player-wrapper']}>
			<ReactPlayer
				className={styles['react-player']}
				url={url}
				controls={true}
				playing={status}
				loop={true}
				width='100%'
				height='100%'
				ref={playerRef}
			/>
		</div>
	)
}

export default VideoPlayer
