import { useState, useEffect, lazy } from 'react'
import styles from './Navigation.module.scss'
import NavLinkCard from '../NavLinkCard/NavLinkCard'
import ProfileOverview from '../ProfileOverview/ProfileOverview'
import SkillsGrid from '../SkillsGrid/SkillsGrid'
import ExperienceSection from '../ExperienceSection/ExperienceSection'
import ContentExtras from '../ContentExtras/ContentExtras'

const Navigation = ({ handleNavStatusToggle, handleCardHover }) => {
	// TODO: make this data dynamic
	const data = [
		{
			title: 'Hello',
			description: 'Nice to meet you',
			fullContent: <ProfileOverview />,
		},
		{
			title: 'Skills',
			description: "I'm an engineer",
			fullContent: <SkillsGrid />,
		},
		{
			title: 'Work',
			description: 'I build things',
			fullContent: <ExperienceSection />,
		},
		{
			title: 'Extras',
			description: "But that's not all",
			fullContent: <ContentExtras />,
		},
	]

	const [cardStatuses, setCardStatuses] = useState(data.map(() => 'min'))

	const handleClick = (index) => {
		// set the status of the clicked card to 'max' and all others to 'hidden'
		const newCardStatuses = cardStatuses.map((status, i) =>
			i === index ? 'max' : 'hidden'
		)
		setCardStatuses(newCardStatuses)
		// run the toggle functions
		handleNavStatusToggle(true)
	}

	const handleHover = (index) => {
		handleCardHover(data[index].description)
	}

	const resetCardStatuses = () => {
		setCardStatuses(data.map(() => 'min'))
		// run the toggle functions
		handleNavStatusToggle(false)
	}

	return (
		<div className={styles['nav-container']}>
			<div className={styles['nav']}>
				<div className={styles['nav-inner']}>
					{data.map(({ title, description, fullContent }, index) => (
						<NavLinkCard
							key={index}
							title={title}
							status={cardStatuses[index]}
							onClick={() => handleClick(index)}
							onClickClose={() => resetCardStatuses()}
							onHover={() => handleHover(index)}
							fullContent={fullContent}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Navigation
