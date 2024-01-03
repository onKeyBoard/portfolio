import React from 'react'
import styles from './NavLinkCard.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

interface NavLinkCardProps {
	title: string
	status: string
	onClick: () => void
	onClickClose: () => void
	onHover: () => void
	fullContent?: React.ReactNode
}

const NavLinkCard = ({
	title,
	status,
	onClick,
	onClickClose,
	onHover,
	fullContent,
}: NavLinkCardProps) => {
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
		<a
			className={styles['border']}
			onClick={handleClick}
			onMouseEnter={handleHover}
		>
			{cardContent}
		</a>
	)

	const fullCard = () => (
		<div className={styles['border']}>
			{cardContent}
			{fullContent && (
				<div className={styles['full-content']}>
					<div>{fullContent}</div>
				</div>
			)}
			<div className={styles['bottom-bar']}>
				<button className={styles['close']} onClick={onClickClose}>
					<FontAwesomeIcon icon={faBars} />
				</button>
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

export default NavLinkCard
