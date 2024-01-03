import React from 'react'
import styles from './ButtonUnstyled.module.scss'

interface ButtonProps {
	handleClick?: () => void
	children?: React.ReactNode
}

const ButtonUnstyled = ({ handleClick, children }: ButtonProps) => {
	return (
		<button className={styles['button']} onClick={handleClick}>
			{children}
		</button>
	)
}

export default ButtonUnstyled
