import styles from './ExperienceSection.module.scss'
import ExperienceCard from '../ExperienceCard/ExperienceCard'
import SectionTitleBanner from '../SectionTitleBanner/SectionTitleBanner'

const ExperienceSection = () => {
	const data = [
		{
			company: 'Needmore Designs',
			title: 'Front End Developer',
			dates: '2014 - 2015',
			description:
				'Bespoke WordPress and Shopify themes, E-commerce, PHP, SQL, Liquid, JavaScript, node.js, Gulp, Sass.',
			imageUrl: 'images/sky-bg.png',
		},
		{
			company: 'Speak! Agency',
			title: 'Front End Developer',
			dates: '2015 - 2019',
			description:
				'Custom WordPress themes, Web Apps, Marketing, JavaScript, PHP, SQL, Sass.',
			imageUrl: 'images/sky-bg.png',
		},
		{
			company: 'Singularity Interactive',
			title: 'Software Engineer',
			dates: '2019 - 2022',
			description:
				'React, React Native, Node.js, GraphQL, TypeScript, AWS, Sass, CI/CD, Material UI, Tailwind CSS, Docker, Kubernetes, Next.js, Gatsby, Storybook, Jest, Cypress, and more.',
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
			<SectionTitleBanner text="Here's a snapshot of my journey from 2014 to now." />
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
			<SectionTitleBanner text='Some of my favorite projects:' />
		</div>
	)
}

export default ExperienceSection
