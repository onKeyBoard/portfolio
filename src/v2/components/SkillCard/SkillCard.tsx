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
						<img
							className={styles['icon']}
							src={getCloudinaryImage(iconUrl, 64)}
							alt=''
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
