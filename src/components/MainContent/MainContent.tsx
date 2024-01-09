import React, { useState, useRef, useEffect, Suspense, useContext } from 'react'
import { ThemeContext } from '../../context/ThemeProvider'
import styles from './MainContent.module.scss'
import Scene3D from '../Scene3D2/Scene3D'
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import limitMouseX from '../../utils/generalUtils'

const MainContent = () => {
	const [mouseX, setMouseX] = useState<number>(0)
	const [isAnyCardOpen, setIsAnyCardOpen] = useState<boolean>(false)
	const [hoverText, setHoverText] = useState<string>('Hello, World!')

	const containerRef = useRef<HTMLDivElement>(null)
	const bgPosX = useRef<number>(0)
	const textRef = useRef<HTMLDivElement>(null)
	const textBgRef = useRef<HTMLDivElement>(null)
	const textRotation = useRef<number>(0)

	const theme = useContext(ThemeContext).theme

	// Animates the background image
	useEffect(() => {
		let animationFrameId: number

		let normalizedMouseX = limitMouseX(mouseX, 1)

		const animate = () => {
			if (
				containerRef.current &&
				textRef.current &&
				textBgRef.current &&
				!isAnyCardOpen
			) {
				// Move the background image
				bgPosX.current += (mouseX * 0.25 - bgPosX.current) * 0.1
				containerRef.current.style.backgroundPositionX = `${bgPosX.current}px`
				textBgRef.current.style.backgroundPositionX = `-${bgPosX.current}px`
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

	// Reset the hover text value when a card is opened
	useEffect(() => {
		if (isAnyCardOpen) {
			setHoverText('Thanks for visiting!')
		}
	}, [isAnyCardOpen])

	// track if any card is open
	const switchToggleState = () => {
		setIsAnyCardOpen((prevState) => !prevState)
	}

	// switch the headline when hovering over a card
	// Hover text is defined in the Navigation component
	const switchHoverText = (textValue: string) => {
		const hoverHeadline: HTMLElement | null =
			document.getElementById('headline')
		// If the headline is not found, return
		if (!hoverHeadline) return
		// Animate the headline
		hoverHeadline.style.opacity = '0'
		hoverHeadline.style.transform = 'translateY(10px)'
		setTimeout(() => {
			hoverHeadline.style.opacity = '1'
			hoverHeadline.style.transform = 'translateY(0)'
			setHoverText(textValue)
		}, 200)
	}

	return (
		<section
			className={styles['main']}
			onMouseMove={(e) => setMouseX(e.clientX)}
		>
			<Suspense fallback={<BlockyLoader />}>
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
							<div
								className={`${styles['headline-background']} ${styles[theme]} ${
									isAnyCardOpen ? styles['hide'] : ''
								}`}
								ref={textRef}
							>
								<h2 ref={textBgRef}>{hoverText}</h2>
							</div>
						</div>
						<Navigation
							handleNavStatusToggle={switchToggleState}
							handleCardHover={switchHoverText}
						/>
						<Footer toggledStyle={isAnyCardOpen} />
					</div>
				</div>
			</Suspense>
		</section>
	)
}

export default MainContent
