import React, { useContext } from 'react'
import { ThemeContextV2 } from '../../context/ThemeProviderV2'
import styles from './ThemeToggle.module.scss'

const ThemeToggle = () => {
	const { theme, toggleTheme } = useContext(ThemeContextV2)

	return (
		<button
			type='button'
			className={styles['toggle']}
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
			aria-pressed={theme === 'dark'}
		>
			{theme === 'light' ? '☾' : '☀'}
		</button>
	)
}

export default ThemeToggle
