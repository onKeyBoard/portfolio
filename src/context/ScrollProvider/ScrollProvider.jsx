import React, { createContext, useState } from 'react'

const ScrollContext = createContext()

const ScrollProvider = ({ children }) => {
	const [scrollOffset, setScrollOffset] = useState(0)

	const handleScroll = () => {
		const offset = window.scrollY || document.documentElement.scrollTop
		setScrollOffset(offset)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<ScrollContext.Provider value={scrollOffset}>
			{children}
		</ScrollContext.Provider>
	)
}

export default ScrollProvider
