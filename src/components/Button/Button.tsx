import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
	style?: 'primary' | 'secondary'
	handleClick?: () => void
	text: string
	theme?: string
}

const Button = ({
	style = 'primary',
	handleClick,
	text,
	theme,
}: ButtonProps) => {
	return (
		<button
			className={`${styles['button']} ${styles[style]} ${styles[theme]}`}
			onClick={handleClick}
		>
			{text}
		</button>
	)
}

export default Button
