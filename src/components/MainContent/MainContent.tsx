import React, { useState, useRef, useEffect } from 'react'
import styles from './MainContent.module.scss'
import Scene3D from '../Scene3D2/Scene3D'
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import limitMouseX from '../../utils/generalUtils'

const MainContent = () => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false)
	const [mouseX, setMouseX] = useState<number>(0)
	const [isAnyCardOpen, setIsAnyCardOpen] = useState<boolean>(false)
	const [hoverText, setHoverText] = useState<string>(
		process.env.NEXT_PUBLIC_PRE_RELEASE === 'true'
			? 'Under Construction'
			: 'Hello, World!'
	)

	const containerRef = useRef<HTMLDivElement>(null)
	const bgPosX = useRef<number>(0)
	const textRef = useRef<HTMLDivElement>(null)
	const textBgRef = useRef<HTMLDivElement>(null)
	const textRotation = useRef<number>(0)

	// Wait til all assets are loaded to show content
	useEffect(() => {
		const handleLoad = () => {
			setIsLoaded(true)
		}

		window.addEventListener('load', handleLoad)

		return () => {
			window.removeEventListener('load', handleLoad)
		}
	}, [])

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

	const switchToggleState = () => {
		setIsAnyCardOpen((prevState) => !prevState)
	}

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

	!isLoaded && <BlockyLoader />

	return (
		<section
			className={styles['main']}
			onMouseMove={(e) => setMouseX(e.clientX)}
		>
			{!isLoaded ? (
				<BlockyLoader />
			) : (
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
								className={`${styles['headline-background']} ${
									isAnyCardOpen ? styles['hide'] : ''
								}`}
								ref={textRef}
							>
								<h2 ref={textBgRef}>{hoverText}</h2>
							</div>
						</div>
						{process.env.NEXT_PUBLIC_PRE_RELEASE !== 'true' && (
							<Navigation
								handleNavStatusToggle={switchToggleState}
								handleCardHover={switchHoverText}
							/>
						)}
						<Footer toggledStyle={isAnyCardOpen} />
					</div>
				</div>
			)}
		</section>
	)
}

export default MainContent
