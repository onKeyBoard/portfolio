import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Skill } from '../../data/skills'
import { getCloudinaryImage } from '../../../utils/cloudinaryUtils'
import styles from './SkillCard.module.scss'

const SkillIcon = ({ skill }: { skill: Skill }) => {
	const { iconUrl, faIcon } = skill

	if (iconUrl) {
		return (
			<span
				className={`${styles['icon']} ${styles['maskIcon']}`}
				style={
					{
						'--icon-url': `url(${getCloudinaryImage(iconUrl, 64)})`,
					} as React.CSSProperties
				}
				aria-hidden='true'
			/>
		)
	}

	return faIcon ? (
		<FontAwesomeIcon className={styles['icon']} icon={faIcon} />
	) : null
}

interface SkillCardProps {
	skill: Skill
	compact?: boolean
}

const SkillCard = ({ skill, compact }: SkillCardProps) => {
	if (compact) {
		return (
			<li className={`${styles['card']} ${styles['compact']}`}>
				<SkillIcon skill={skill} />
				<span className={styles['title']}>{skill.title}</span>
			</li>
		)
	}

	return (
		<li className={styles['ring']}>
			<div className={styles['gapLayer']}>
				<div className={styles['card']}>
					<SkillIcon skill={skill} />
					<span className={styles['title']}>{skill.title}</span>
				</div>
			</div>
		</li>
	)
}

export default SkillCard
