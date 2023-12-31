import styles from './ProjectShowcase.module.scss'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS_SIMPLE } from '../../queries/projects.js'
import BlockyLoader from '../BlockyLoader/BlockyLoader.jsx'
import ProjectCard from '../ProjectCard/ProjectCard.jsx'
import ProjectCarousel from '../ProjectCarousel/ProjectCarousel.jsx'

const ProjectShowcase = ({ category }) => {
	const [selectedProject, setSelectedProject] = useState(null)
	// Category must match one of the enums in the Project model
	const categoryEnums = ['Personal', 'Professional']
	// Fallback: if the category prop is not one of the enums, set it to 'Professional'
	if (!categoryEnums.includes(category)) {
		category = 'Professional'
	}
	// Get the projects from the database
	const { loading, error, data } = useQuery(GET_PROJECTS_SIMPLE, {
		variables: { category },
	})
	if (loading) return <BlockyLoader />
	if (error) return <p>Error : {error.message}</p>
	const { projects } = data
	return (
		<div className={styles['container']}>
			<div className={styles['carousel']}>
				{selectedProject && (
					<ProjectCarousel key={selectedProject} projectId={selectedProject} />
				)}
			</div>
			<div className={styles['showcase-nav']}>
				{projects.map(({ id, title, year, type, imageUrl }) => (
					<ProjectCard
						active={selectedProject === id}
						key={id}
						title={title}
						year={year}
						type={type}
						imageUrl={imageUrl}
						handleClick={() => setSelectedProject(id)}
					/>
				))}
			</div>
		</div>
	)
}

export default ProjectShowcase
