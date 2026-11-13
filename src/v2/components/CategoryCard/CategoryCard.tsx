import React, { forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import type { SkillCategory } from '../../data/skills'
import styles from './CategoryCard.module.scss'

interface CategoryCardProps {
	category: SkillCategory
	showSummary?: boolean
	showArrow?: boolean
	selected?: boolean
	onPreview?: (id: string) => void
	onOpen: (id: string) => void
}

const CategoryCard = forwardRef<HTMLButtonElement, CategoryCardProps>(
	(
		{ category, showSummary, showArrow = true, selected, onPreview, onOpen },
		ref
	) => {
		const { id, title, tag, summary, skills } = category

		return (
			<li
				className={styles['ring']}
				data-selected={selected || undefined}
				onMouseEnter={onPreview && (() => onPreview(id))}
			>
				<div className={styles['gapLayer']}>
					<button
						ref={ref}
						type='button'
						className={styles['card']}
						aria-pressed={selected === undefined ? undefined : selected}
						onFocus={
							onPreview &&
							((event) => {
								if (event.currentTarget.matches(':focus-visible')) onPreview(id)
							})
						}
						onClick={() => onOpen(id)}
					>
						<span className={styles['top']}>
							<span className={styles['tag']}>{tag}</span>
							{showArrow && (
								<FontAwesomeIcon
									className={styles['arrow']}
									icon={faArrowRight}
								/>
							)}
						</span>
						<span className={styles['title']}>{title}</span>
						{showSummary && (
							<span className={styles['summary']}>{summary}</span>
						)}
						<span className={styles['count']}>{skills.length} skills</span>
					</button>
				</div>
			</li>
		)
	}
)

CategoryCard.displayName = 'CategoryCard'

export default CategoryCard
