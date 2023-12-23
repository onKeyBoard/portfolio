import styles from './ExperienceSection.module.scss'
import ExperienceCard from '../ExperienceCard/ExperienceCard'

const ExperienceSection = () => {
	const data = [
		{
			company: 'Needmore Designs',
			title: 'Front End Developer',
			dates: '2014 - 2015',
			description: 'Description 1',
			imageUrl: 'images/sky-bg.png',
		},
		{
			company: 'Speak! Agency',
			title: 'Front End Developer',
			dates: '2015 - 2019',
			description: 'Description 2',
			imageUrl: 'images/sky-bg.png',
		},
		{
			company: 'Singularity Interactive',
			title: 'Software Engineer',
			dates: '2019 - 2022',
			description: 'Description 3',
			imageUrl: 'images/sky-bg.png',
		},
		{
			company: 'Company 4',
			title: 'Title 4',
			dates: '2022 - present',
			description: 'Description 4',
			imageUrl: 'images/sky-bg.png',
		},
	]

	return (
		<div className={styles['container']}>
			<h1>Places I've worked</h1>
			<div className={styles['cards']}>
				{data.map(({ company, title, dates, description, imageUrl }, index) => (
					<ExperienceCard
						key={index}
						company={company}
						title={title}
						dates={dates}
						description={description}
						imageUrl={imageUrl}
					/>
				))}
			</div>
		</div>
	)
}

export default ExperienceSection
