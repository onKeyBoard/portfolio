import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeProvider'
import styles from './NavContentCard.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import ButtonUnstyled from '../ButtonUnstyled/ButtonUnstyled'

interface NavContentCardProps {
	title: string
	status: string
	onClick: () => void
	onClickClose: () => void
	onHover: () => void
	fullContent?: React.ReactNode
}

const NavContentCard = ({
	title,
	status,
	onClick,
	onClickClose,
	onHover,
	fullContent,
}: NavContentCardProps) => {
	const { theme } = useContext(ThemeContext)
	const themeClass = `${styles['border']} ${styles[theme]}`
	// Use an enum to make sure the status is only one of three values
	const StatusEnum = {
		MIN: 'min',
		MAX: 'max',
		HIDDEN: 'hidden',
	}
	// If the status is not one of the three values, set it to hidden
	if (!Object.values(StatusEnum).includes(status)) {
		status = StatusEnum.HIDDEN
	}
	const isHidden = status === StatusEnum.HIDDEN

	const handleClick = () => {
		onClick()
	}

	const handleHover = () => {
		onHover()
	}

	const cardContent = (
		<div className={styles['card']}>
			<div className={styles['content']}>
				<h2 className={styles['title']}>{title}</h2>
			</div>
		</div>
	)
	// Render the min card if the status is not max, otherwise render the full card
	const minCard = () => (
		<a className={themeClass} onClick={handleClick} onMouseEnter={handleHover}>
			{cardContent}
		</a>
	)

	const fullCard = () => (
		<div className={themeClass}>
			{cardContent}
			{fullContent && (
				<div className={styles['full-content']}>
					<div>{fullContent}</div>
				</div>
			)}
			<div className={styles['bottom-bar']}>
				<ButtonUnstyled handleClick={onClickClose}>
					<div className={styles['close']}>
						<FontAwesomeIcon icon={faBars} />
					</div>
				</ButtonUnstyled>
			</div>
		</div>
	)

	return (
		<div
			className={`${styles['wrapper']} ${
				status === StatusEnum.MAX ? styles['max'] : ''
			} ${isHidden ? styles['hidden'] : ''}`}
		>
			{status === StatusEnum.MAX ? fullCard() : minCard()}
		</div>
	)
}

export default NavContentCard
