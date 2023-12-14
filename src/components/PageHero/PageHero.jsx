import { useState } from 'react'
import styles from './PageHero.module.scss'
import CanvasContainer from '../../scenes/Scene1'
import UILayer from '../UILayer/UILayer'

const PageHero = () => {
	const [mouseX, setMouseX] = useState(0)
	const [pageCardOpen, setPageCardOpen] = useState(false)

	const onPageCardClick = () => {
		setPageCardOpen(!pageCardOpen)
	}

	return (
		<section
			className={styles['main']}
			onMouseMove={(e) => setMouseX(e.clientX)}
		>
			<div className={styles['container']}>
				<CanvasContainer mouseX={mouseX} zoomedIn={pageCardOpen} />
				<UILayer handleNavStatusToggle={onPageCardClick} />
			</div>
		</section>
	)
}

export default PageHero
