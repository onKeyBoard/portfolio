import styles from './ProjectBrowser.module.scss'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS_SIMPLE } from '../../queries/projects.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import ProjectCard from '../ProjectCard/ProjectCard'
import Button from '../Button/Button'
import ProjectCarousel from '../ProjectCarousel/ProjectCarousel'
import SectionTitle from '../SectionTitle/SectionTitle'

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

	const loadProjectSlides = (projectId: string) => {
		setSelectedProject(projectId)
		setShowNav(false)
	}

	if (loading) return <BlockyLoader />
	if (error) return <p>Error : {error.message}</p>
	const { projects } = data

	const carouselContent = (
		<div className={styles['carousel']}>
			{selectedProject && (
				<ProjectCarousel key={selectedProject} projectId={selectedProject} />
			)}
			<div className={styles['go-back']}>
				<Button handleClick={() => setShowNav(true)} text='Select a project' />
			</div>
		</div>
	)

	const navContent = (
		<div className={styles['browse-nav']}>
			<div className={styles['browse-title']}>
				<SectionTitle text='Select a project' />
				<div className={styles['browse-icon']}>
					<FontAwesomeIcon icon={faAngleDown} />
				</div>
			</div>
			<div className={styles['showcase-cards']}>
				{projects.map(({ id, title, year, imageUrl }) => (
					<div className={styles['card']}>
						<div className={styles['card-hover']}>
							<ProjectCard
								active={selectedProject === id}
								key={id}
								title={title}
								year={year}
								imageUrl={imageUrl}
								handleClick={() => loadProjectSlides(id)}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)

	return (
		<div className={styles['container']}>
			{showNav ? navContent : carouselContent}
		</div>
	)
}

export default ProjectShowcase
