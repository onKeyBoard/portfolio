import React, { createContext, useState } from 'react'

interface ThemeContextProps {
	theme: string
	switchTheme: (themeName: string) => void
	setRandomTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps>(undefined!)

const ThemeProvider = ({ children }) => {
	const validThemes = ['green', 'blue', 'red']
	const [theme, setTheme] = useState<string>(validThemes[0])

	const switchTheme = (themeName: string) => {
		console.log('switchTheme', themeName)
		validThemes.includes(themeName)
			? setTheme(themeName)
			: setTheme(validThemes[0])
	}

	const setRandomTheme = () => {
		const randomIndex = Math.floor(Math.random() * validThemes.length)
		setTheme(validThemes[randomIndex])
	}

	return (
		<ThemeContext.Provider value={{ theme, switchTheme, setRandomTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
