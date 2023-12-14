import styles from './LinkCard.module.scss'
import HoverTilter from '../HoverTilter/HoverTilter'

const LinkCard = ({
	imageUrl,
	title,
	description,
	status,
	onClick,
	onClickClose,
	pageContent,
}) => {
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

	const cardContent = (
		<div className={styles['card']}>
			<div className={styles['image']}>
				<img src={imageUrl} alt={title} />
			</div>
			<div className={styles['content']}>
				<h2 className={styles['title']}>{title}</h2>
				<p className={styles['description']}>{description}</p>
			</div>
		</div>
	)
	// Render the min card if the status is not max, otherwise render the full card
	const minCard = () => (
		<a className={styles['border']} onClick={handleClick}>
			{cardContent}
		</a>
	)

	const fullCard = () => (
		<div className={styles['border']}>
			{cardContent}
			{pageContent && (
				<div className={styles['page-content']}>
					<div>{pageContent}</div>
				</div>
			)}
			<button className={styles['close']} onClick={onClickClose}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					stroke='black'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='feather feather-x'
				>
					<line x1='18' y1='6' x2='6' y2='18'></line>
					<line x1='6' y1='6' x2='18' y2='18'></line>
				</svg>
			</button>
		</div>
	)

	return (
		<div
			className={`${styles['wrapper']} ${
				status === StatusEnum.MAX ? styles['expanded'] : ''
			} ${isHidden ? styles['hidden'] : ''}`}
		>
			{status === StatusEnum.MAX ? fullCard() : minCard()}
		</div>
	)
}

export default LinkCard
