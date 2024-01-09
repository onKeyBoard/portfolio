import React, { createContext, useState } from 'react'

interface ThemeContextProps {
	theme: string
	switchTheme: (themeName: string) => void
}

export const ThemeContext = createContext<ThemeContextProps>(undefined!)

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('green')

	const switchTheme = (themeName: string) => {
		const validThemes = ['green', 'blue', 'red']
		validThemes.includes(themeName) ? setTheme(themeName) : setTheme('green')
	}

	return (
		<ThemeContext.Provider value={{ theme, switchTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
