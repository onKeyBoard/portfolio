import styles from './ProjectShowcase.module.scss'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS_SIMPLE } from '../../queries/projects.js'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import ProjectCard from '../ProjectCard/ProjectCard'
import ProjectCarousel from '../ProjectCarousel/ProjectCarousel'

interface ProjectShowcaseProps {
	category?: string
}

const ProjectShowcase = ({ category }: ProjectShowcaseProps) => {
	const [selectedProject, setSelectedProject] = useState(null)
	const [showNav, setShowNav] = useState(true)
	// Category must match one of the enums in the Project model
	const categoryEnums = ['Personal', 'Professional']
	// Fallback: if the category prop is not one of the enums, set it to 'Professional'
	const validCategory =
		category && categoryEnums.includes(category) ? category : 'Professional'

	// Get the projects from the database
	const { loading, error, data } = useQuery(GET_PROJECTS_SIMPLE, {
		variables: { category: validCategory },
	})

	useEffect(() => {
		if (data && data.projects && data.projects.length > 0) {
			setSelectedProject(data.projects[0].id)
		}
	}, [data])

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
				<div className={styles['showcase-nav-title']}>
					<h5>Select a project</h5>
				</div>
				<div className={styles['showcase-cards']}>
					{projects.map(({ id, title, year, imageUrl }) => (
						<ProjectCard
							active={selectedProject === id}
							key={id}
							title={title}
							year={year}
							imageUrl={imageUrl}
							handleClick={() => setSelectedProject(id)}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default ProjectShowcase
