import { useState, useRef, useEffect } from 'react'
import styles from './MainContent.module.scss'
import Scene3D from '../Scene3D/Scene3D'
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import limitMouseX from '../../utils/generalUtils'

const MainContent = () => {
	const [mouseX, setMouseX] = useState(0)
	const [isAnyCardOpen, setIsAnyCardOpen] = useState(false)
	const [hoverText, setHoverText] = useState('Hello, World!')

	const containerRef = useRef(null)
	const bgPosX = useRef(0)
	const textRef = useRef(null)
	const textRotation = useRef(0)

	// Animates the background image
	useEffect(() => {
		let animationFrameId

		let normalizedMouseX = limitMouseX(mouseX, 1)

		const animate = () => {
			if (containerRef.current && textRef.current && !isAnyCardOpen) {
				// Move the background image
				bgPosX.current += (mouseX * 0.25 - bgPosX.current) * 0.1
				containerRef.current.style.backgroundPositionX = `-${bgPosX.current}px`
				// Rotate the text
				textRotation.current +=
					(normalizedMouseX * 10 - textRotation.current) * 0.1
				textRef.current.style.transform = `rotate3d(${
					normalizedMouseX * 0.8
				}, -2, 0, ${textRotation.current}deg)`

				animationFrameId = requestAnimationFrame(animate)
			}
		}

		animate()

		return () => {
			cancelAnimationFrame(animationFrameId)
		}
	}, [mouseX, isAnyCardOpen, bgPosX, textRotation])

	const switchToggleState = () => {
		setIsAnyCardOpen((prevState) => !prevState)
	}

	const switchHoverText = (textValue) => {
		const hoverHeadline = document.getElementById('headline')
		hoverHeadline.style.opacity = '0'
		hoverHeadline.style.transform = 'translateY(20px) scale(0.9)'
		setTimeout(() => {
			hoverHeadline.style.opacity = '1'
			hoverHeadline.style.transform = 'translateY(0) scale(1)'
			setHoverText(textValue)
		}, 200)
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
					<div id='headline' className={styles['hover-headline']}>
						<h2 ref={textRef}>{hoverText}</h2>
					</div>
					<Navigation
						handleNavStatusToggle={switchToggleState}
						handleCardHover={switchHoverText}
					/>
					<Footer toggledStyle={isAnyCardOpen} />
				</div>
			</div>
		</section>
	)
}

export default MainContent
