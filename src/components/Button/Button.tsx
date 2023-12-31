import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
	style?: 'primary' | 'secondary'
	handleClick?: () => void
	text: string
}

const Button = ({ style = 'primary', handleClick, text }: ButtonProps) => {
	return (
		<button
			className={`${styles['button']} ${styles[style]}`}
			onClick={handleClick}
		>
			{text}
		</button>
	)
}

export default Button
