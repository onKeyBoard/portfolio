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

export const THEME_STORAGE_KEY = 'v2-theme'

const ThemeProviderV2 = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<ThemeNameV2>('dark')

	useEffect(() => {
		if (document.documentElement.dataset.v2Theme === 'light') {
			setTheme('light')
		}
	}, [])

	const toggleTheme = useCallback(() => {
		setTheme((prev) => {
			const next = prev === 'light' ? 'dark' : 'light'
			document.documentElement.dataset.v2Theme = next
			try {
				window.localStorage.setItem(THEME_STORAGE_KEY, next)
			} catch {}
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
