import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { ThemeContextV2 } from '../../context/ThemeProviderV2'
import styles from './ThemeToggle.module.scss'

const ThemeToggle = () => {
	const { theme, toggleTheme } = useContext(ThemeContextV2)
	const isDark = theme === 'dark'

	return (
		<button
			type='button'
			className={styles['toggle']}
			onClick={toggleTheme}
			aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
			aria-pressed={isDark}
		>
			<FontAwesomeIcon
				icon={faSun}
				className={`${styles['icon']} ${isDark ? styles['shown'] : ''}`}
			/>
			<FontAwesomeIcon
				icon={faMoon}
				className={`${styles['icon']} ${isDark ? '' : styles['shown']}`}
			/>
		</button>
	)
}

export default ThemeToggle
