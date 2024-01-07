import React, { useState } from 'react'
import styles from './Navigation.module.scss'
import NavContentCard from '../NavContentCard/NavContentCard'
import ContentHello from '../ContentHello/ContentHello'
import ContentSkills from '../ContentSkills/ContentSkills'
import ContentWork from '../ContentWork/ContentWork'
import ContentExtras from '../ContentExtras/ContentExtras'

interface NavigationProps {
	handleNavStatusToggle: (status: boolean) => void
	handleCardHover: (description: string) => void
}

interface NavContentCardData {
	title: string
	description: string
	fullContent: JSX.Element
}

type CardStatus = 'min' | 'max' | 'hidden'

const Navigation = ({
	handleNavStatusToggle,
	handleCardHover,
}: NavigationProps) => {
	// TODO: make this data dynamic
	const data: NavContentCardData[] = [
		{
			title: 'Hello',
			description: 'Nice to meet you.',
			fullContent: <ContentHello />,
		},
		{
			title: 'Skills',
			description: "I'm an engineer.",
			fullContent: <ContentSkills />,
		},
		{
			title: 'Work',
			description: 'I build things.',
			fullContent: <ContentWork />,
		},
		{
			title: 'Extras',
			description: "But wait, there's more!",
			fullContent: <ContentExtras />,
		},
	]

	const [cardStatuses, setCardStatuses] = useState<CardStatus[]>(
		data.map(() => 'min')
	)

	const handleClick = (index: number) => {
		// set the status of the clicked card to 'max' and all others to 'hidden'
		const newCardStatuses = cardStatuses.map((status, i) =>
			i === index ? 'max' : 'hidden'
		)
		setCardStatuses(newCardStatuses)
		// run the toggle functions
		handleNavStatusToggle(true)
	}

	const handleHover = (index: number) => {
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
					{data.map(
						({ title, fullContent }: NavContentCardData, index: number) => (
							<NavContentCard
								key={index}
								title={title}
								status={cardStatuses[index]}
								onClick={() => handleClick(index)}
								onClickClose={() => resetCardStatuses()}
								onHover={() => handleHover(index)}
								fullContent={fullContent}
							/>
						)
					)}
				</div>
			</div>
		</div>
	)
}

export default Navigation
