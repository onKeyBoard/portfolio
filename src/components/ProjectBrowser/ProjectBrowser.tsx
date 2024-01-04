import styles from './ProjectBrowser.module.scss'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS_SIMPLE } from '../../queries/projects.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import ProjectCard from '../ProjectCard/ProjectCard'
import ButtonUnstyled from '../ButtonUnstyled/ButtonUnstyled'
import ProjectCarousel from '../ProjectCarousel/ProjectCarousel'
import SectionTitle from '../SectionTitle/SectionTitle'

interface ProjectShowcaseProps {
	category?: string
}

const ProjectShowcase = ({ category }: ProjectShowcaseProps) => {
	const [selectedProject, setSelectedProject] = useState<string | null>(null)
	const [showNav, setShowNav] = useState<boolean>(true)
	const [loading, setLoading] = useState<boolean>(true)
	const [carouselIsLoaded, setCarouselIsLoaded] = useState<boolean>(false)
	// Category must match one of the enums in the Project model
	const categoryEnums = ['Personal', 'Professional']
	// Fallback: if the category prop is not one of the enums, set it to 'Professional'
	const validCategory =
		category && categoryEnums.includes(category) ? category : 'Professional'

	// Artificially delay the loading state to prevent any performance issues with animations
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 500)
		return () => clearTimeout(timer)
	}, [])

	// Get the projects from the database
	const {
		loading: queryLoading,
		error,
		data,
	} = useQuery(GET_PROJECTS_SIMPLE, {
		variables: { category: validCategory },
	})

	// Update the necessary states when a project is selected
	const loadProjectSlides = (projectId: string) => {
		setSelectedProject(projectId)
		setShowNav(false)
	}
	// Callback function for the Carousel component. When it has loaded, we can show the back button.
	// This is nice because it means we won't animate the button reveal until the carousel is also revealed.
	const showBackButton = () => {
		setCarouselIsLoaded(true)
	}

	// Back Button functionality
	const handleBackButton = () => {
		setSelectedProject(null)
		setShowNav(true)
	}

	if (loading || queryLoading) return <BlockyLoader />
	if (error) return <p>Error : {error.message}</p>
	const { projects } = data

	const carouselContent = (
		<div className={styles['carousel']}>
			{selectedProject && (
				<ProjectCarousel
					key={selectedProject}
					projectId={selectedProject}
					onLoaded={() => showBackButton()}
				/>
			)}
			{carouselIsLoaded && (
				<ButtonUnstyled handleClick={() => handleBackButton()}>
					<div className={styles['go-back']}>
						<div className={styles['icon-group']}>
							<FontAwesomeIcon icon={faAngleLeft} />
							<span>Go back</span>
						</div>
					</div>
				</ButtonUnstyled>
			)}
		</div>
	)

	const navContent = (
		<div className={styles['browse-nav']}>
			<div className={styles['browse-title']}>
				<SectionTitle text={`${category} Projects`} />
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
