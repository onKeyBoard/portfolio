import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeProvider'
import ButtonUnstyled from '../ButtonUnstyled/ButtonUnstyled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
import styles from './ThemeSwitcher.module.scss'

const ThemeSwitcher = ({ isHidden = false }) => {
	const { theme, switchTheme } = useContext(ThemeContext)
	const handleThemeSwitch = (themeName: string) => {
		switchTheme(themeName)
		setPaletteOpen(false)
	}

	const [paletteOpen, setPaletteOpen] = useState(false)

	return (
		<div
			className={`${styles['theme-switcher']} ${
				isHidden ? styles['hidden'] : ''
			}`}
		>
			{paletteOpen ? (
				<div className={styles['theme-palette']}>
					<ButtonUnstyled handleClick={() => handleThemeSwitch('green')}>
						<div className={styles['green']}></div>
					</ButtonUnstyled>
					<ButtonUnstyled handleClick={() => handleThemeSwitch('blue')}>
						<div className={styles['blue']}></div>
					</ButtonUnstyled>
					<ButtonUnstyled handleClick={() => handleThemeSwitch('red')}>
						<div className={styles['red']}></div>
					</ButtonUnstyled>
				</div>
			) : (
				<div className={`${styles['palette-button']} ${styles[theme]}`}>
					<ButtonUnstyled handleClick={() => setPaletteOpen(true)}>
						<FontAwesomeIcon icon={faPalette} />
					</ButtonUnstyled>
				</div>
			)}
		</div>
	)
}

export default ThemeSwitcher
