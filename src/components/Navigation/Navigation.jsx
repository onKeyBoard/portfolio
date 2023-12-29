import { useState, useEffect, lazy } from 'react'
import styles from './Navigation.module.scss'
import NavLinkCard from '../NavLinkCard/NavLinkCard'
import ProfileOverview from '../ProfileOverview/ProfileOverview'
import SkillsGrid from '../SkillsGrid/SkillsGrid'
import ExperienceSection from '../ExperienceSection/ExperienceSection'

const Navigation = ({ handleNavStatusToggle, handleCardHover }) => {
	// TODO: make this data dynamic
	const data = [
		{
			imageUrl: 'images/sky-bg.png',
			title: 'Hello',
			description: 'Nice to meet you',
			fullContent: <ProfileOverview />,
		},
		{
			imageUrl: 'images/sky-bg.png',
			title: 'Skills',
			description: "I'm an engineer",
			fullContent: <SkillsGrid />,
		},
		{
			imageUrl: 'images/sky-bg.png',
			title: 'Work',
			description: 'I build things',
			fullContent: <ExperienceSection />,
		},
		{
			imageUrl: 'images/sky-bg.png',
			title: 'Extras',
			description: "But that's not all",
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
					{data.map(({ imageUrl, title, description, fullContent }, index) => (
						<NavLinkCard
							key={index}
							imageUrl={imageUrl}
							title={title}
							description={description}
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
