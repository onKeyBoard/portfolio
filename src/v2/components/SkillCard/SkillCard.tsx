import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Skill } from '../../data/skills'
import { getCloudinaryImage } from '../../../utils/cloudinaryUtils'
import styles from './SkillCard.module.scss'

const SkillCard = ({ skill }: { skill: Skill }) => {
	const { title, iconUrl, faIcon } = skill

	return (
		<li className={styles['ring']}>
			<div className={styles['gapLayer']}>
				<div className={styles['card']}>
					{iconUrl ? (
						<span
							className={`${styles['icon']} ${styles['maskIcon']}`}
							style={
								{
									'--icon-url': `url(${getCloudinaryImage(iconUrl, 64)})`,
								} as React.CSSProperties
							}
							aria-hidden='true'
						/>
					) : (
						faIcon && (
							<FontAwesomeIcon className={styles['icon']} icon={faIcon} />
						)
					)}
					<span className={styles['title']}>{title}</span>
				</div>
			</div>
		</li>
	)
}

export default SkillCard
