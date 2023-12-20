import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import styles from './UILayer.module.scss'
import LinkCard from '../LinkCard/LinkCard'
import ProfileOverview from '../ProfileOverview/ProfileOverview'
import SkillsGrid from '../SkillsGrid/SkillsGrid'

const UILayer = ({ handleNavStatusToggle }) => {
	// TODO: make this data dynamic
	const data = [
		{
			href: 'about',
			imageUrl: 'images/space-pixel-bg.png',
			title: 'Profile',
			description: 'About me',
			pageContent: <ProfileOverview />,
		},
		{
			href: 'skills',
			imageUrl: 'images/space-pixel-bg.png',
			title: 'Skills',
			description: 'My work experience',
			pageContent: <SkillsGrid />,
		},
		{
			href: 'Experience',
			imageUrl: 'images/space-pixel-bg.png',
			title: 'EXP',
			description: 'My work',
		},
		{
			href: 'Extras',
			imageUrl: 'images/space-pixel-bg.png',
			title: 'Extras',
			description: 'Get in touch',
		},
	]

	const [cardStatuses, setCardStatuses] = useState(data.map(() => 'min'))

	const handleClick = (index) => {
		// run the toggle function
		handleNavStatusToggle(true)
		// set the status of the clicked card to 'max' and all others to 'hidden'
		const newCardStatuses = cardStatuses.map((status, i) =>
			i === index ? 'max' : 'hidden'
		)
		setCardStatuses(newCardStatuses)
	}

	const resetCardStatuses = () => {
		handleNavStatusToggle(false)
		setCardStatuses(data.map(() => 'min'))
	}

	return (
		<div
			className={`${styles['container']} ${
				cardStatuses.some((status) => status === 'max') ? styles['opened'] : ''
			}`}
		>
			<div className={styles['edge']}></div>
			<div className={styles['title']}>
				<div className={styles['inner']}>
					<h1>Shawn Pavlas</h1>
					<h3>
						Front End Engineer<sup>+</sup>
					</h3>
				</div>
			</div>
			<div className={styles['socials']}>
				<a href='https://www.instagram.com/shawnpavlas/' target='_blank'>
					<FontAwesomeIcon icon={faInstagram} />
				</a>
				<a href='https://www.linkedin.com/in/shawn-pavlas/' target='_blank'>
					<FontAwesomeIcon icon={faLinkedin} />
				</a>
			</div>
			<div className={styles['nav-anchor']}>
				<div className={styles['nav']}>
					<div className={styles['nav-inner']}>
						{data.map((item, index) => (
							<LinkCard
								key={index}
								href={item.href}
								imageUrl={item.imageUrl}
								title={item.title}
								description={item.description}
								status={cardStatuses[index]}
								onClick={() => handleClick(index)}
								onClickClose={() => resetCardStatuses()}
								pageContent={item.pageContent}
							></LinkCard>
						))}
					</div>
				</div>
			</div>
			<div className={styles['footer']}>
				<div className={styles['content']}>
					<div className={styles['info']}>
						<h4>Built with React & NextJS.</h4>
					</div>
					<div className={styles['copyright']}>
						<h4>© 2023</h4>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UILayer
