import React, { createContext, useState } from 'react'

interface ThemeContextProps {
	theme: string
	switchTheme: (themeName: string) => void
}

export const ThemeContext = createContext<ThemeContextProps>(undefined!)

const ThemeProvider = ({ children }) => {
	const validThemes = ['green', 'blue', 'red']
	const [theme, setTheme] = useState(validThemes[(Math.random() * 3) | 0])

	const switchTheme = (themeName: string) => {
		validThemes.includes(themeName) ? setTheme(themeName) : setTheme('green')
	}

	return (
		<ThemeContext.Provider value={{ theme, switchTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
