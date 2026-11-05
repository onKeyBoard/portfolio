import React, {
	createContext,
	useCallback,
	useEffect,
	useState,
} from 'react'

export type ThemeNameV2 = 'light' | 'dark'

interface ThemeContextV2Props {
	theme: ThemeNameV2
	toggleTheme: () => void
}

export const ThemeContextV2 = createContext<ThemeContextV2Props>(undefined!)

const STORAGE_KEY = 'v2-theme'

const ThemeProviderV2 = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<ThemeNameV2>('light')

	useEffect(() => {
		const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeNameV2 | null
		if (stored === 'light' || stored === 'dark') {
			setTheme(stored)
			return
		}
		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches
		setTheme(prefersDark ? 'dark' : 'light')
	}, [])

	useEffect(() => {
		document.body.style.background =
			theme === 'dark' ? 'hsl(222, 26%, 13%)' : 'hsl(36, 40%, 88%)'
		document.documentElement.style.colorScheme = theme
		return () => {
			document.body.style.background = ''
			document.documentElement.style.colorScheme = ''
		}
	}, [theme])

	const toggleTheme = useCallback(() => {
		setTheme((prev) => {
			const next = prev === 'light' ? 'dark' : 'light'
			window.localStorage.setItem(STORAGE_KEY, next)
			return next
		})
	}, [])

	return (
		<ThemeContextV2.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContextV2.Provider>
	)
}

export default ThemeProviderV2
