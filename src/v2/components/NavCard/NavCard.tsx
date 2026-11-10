import React from 'react'
import {
	getCloudinaryImage,
	getCloudinarySrcSet,
} from '../../../utils/cloudinaryUtils'
import styles from './NavCard.module.scss'

const IMAGE_WIDTHS = [400, 800, 1200]
const IMAGE_ASPECT = '16:10'
const IMAGE_SIZES = '(max-width: 899px) 100vw, 380px'

interface NavCardProps {
	title: string
	description?: string
	meta?: string
	iconUrl?: string
	imageUrl?: string
	href?: string
	compact?: boolean
	onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

const NavCard = ({
	title,
	description,
	meta,
	iconUrl,
	imageUrl,
	href,
	compact,
	onClick,
}: NavCardProps) => {
	const content = (
		<>
			{imageUrl && (
				<img
					className={styles['image']}
					src={getCloudinaryImage(imageUrl, IMAGE_WIDTHS[1], IMAGE_ASPECT)}
					srcSet={getCloudinarySrcSet(imageUrl, IMAGE_WIDTHS, IMAGE_ASPECT)}
					sizes={IMAGE_SIZES}
					loading='lazy'
					decoding='async'
					alt=''
				/>
			)}
			{iconUrl && <img className={styles['icon']} src={iconUrl} alt='' />}
			{meta && <span className={styles['meta']}>{meta}</span>}
			<span className={styles['title']}>{title}</span>
			{description && (
				<span className={styles['description']}>{description}</span>
			)}
		</>
	)

	const interactiveClass = href ? styles['interactive'] : ''
	const compactClass = compact ? styles['compact'] : ''

	return (
		<div className={`${styles['ringWrap']} ${interactiveClass} ${compactClass}`}>
			<div className={styles['gapLayer']}>
				{href ? (
					<a className={styles['card']} href={href} onClick={onClick}>
						{content}
					</a>
				) : (
					<div className={styles['card']}>{content}</div>
				)}
			</div>
		</div>
	)
}

export default NavCard
