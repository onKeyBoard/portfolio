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
			href: 'about',
			imageUrl: 'images/sky-bg.png',
			title: 'About',
			description: 'Nice to meet you',
			fullContent: <ProfileOverview />,
		},
		{
			href: 'skills',
			imageUrl: 'images/sky-bg.png',
			title: 'Skills',
			description: 'What I do',
			fullContent: <SkillsGrid />,
		},
		{
			href: 'Experience',
			imageUrl: 'images/sky-bg.png',
			title: 'EXP',
			description: 'My work history',
			fullContent: <ExperienceSection />,
		},
		{
			href: 'Extras',
			imageUrl: 'images/sky-bg.png',
			title: 'Extras',
			description: 'Projects and beyond',
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
					{data.map((item, index) => (
						<NavLinkCard
							key={index}
							href={item.href}
							imageUrl={item.imageUrl}
							title={item.title}
							description={item.description}
							status={cardStatuses[index]}
							onClick={() => handleClick(index)}
							onClickClose={() => resetCardStatuses()}
							onHover={() => handleHover(index)}
							fullContent={item.fullContent}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Navigation
