import { useState, useRef, useEffect } from 'react'
import styles from './MainContent.module.scss'
import Scene3D from '../Scene3D/Scene3D'
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'

const MainContent = () => {
	const [mouseX, setMouseX] = useState(0)
	const [isAnyCardOpen, setIsAnyCardOpen] = useState(false)

	const containerRef = useRef(null)
	const bgPosX = useRef(0)

	// Animates the background image

	useEffect(() => {
		let animationFrameId
		const animate = () => {
			if (containerRef.current && !isAnyCardOpen) {
				bgPosX.current += (mouseX * 0.25 - bgPosX.current) * 0.1
				containerRef.current.style.backgroundPositionX = `-${bgPosX.current}px`
				animationFrameId = requestAnimationFrame(animate)
			}
		}
		animate()

		return () => {
			cancelAnimationFrame(animationFrameId)
		}
	}, [mouseX, isAnyCardOpen, bgPosX])

	const onPageCardClick = () => {
		setIsAnyCardOpen((prevState) => !prevState)
	}

	return (
		<section
			className={styles['main']}
			onMouseMove={(e) => setMouseX(e.clientX)}
		>
			<div className={styles['layers']}>
				<section
					className={`${styles['canvas-layer']} ${
						isAnyCardOpen ? styles['zoomed'] : ''
					}`}
					ref={containerRef}
				>
					<Scene3D mouseX={mouseX} zoomedIn={isAnyCardOpen} />
				</section>
				<div className={styles['ui-layer']}>
					<Header toggledStyle={isAnyCardOpen} />
					<Navigation handleNavStatusToggle={onPageCardClick} />
					<Footer toggledStyle={isAnyCardOpen} />
				</div>
			</div>
		</section>
	)
}

export default MainContent
