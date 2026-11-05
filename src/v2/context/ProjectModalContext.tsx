import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

export interface ModalProjectSlide {
	id: string
	title: string
	description: string
	imageUrl: string
}

export interface ModalProject {
	id: string
	type: string[]
	year: string
	title: string
	description: string
	imageUrl: string
	link: string
	projectSlides?: ModalProjectSlide[]
}

interface ProjectModalContextValue {
	activeProject: ModalProject | null
	openProject: (project: ModalProject) => void
	closeProject: () => void
}

const ProjectModalContext = createContext<ProjectModalContextValue>({
	activeProject: null,
	openProject: () => {},
	closeProject: () => {},
})

const ProjectModalProvider = ({ children }: { children: React.ReactNode }) => {
	const [activeProject, setActiveProject] = useState<ModalProject | null>(
		null
	)

	const openProject = useCallback((project: ModalProject) => {
		setActiveProject(project)
	}, [])

	const closeProject = useCallback(() => {
		setActiveProject(null)
	}, [])

	useEffect(() => {
		if (!activeProject) return

		const scroller = document.querySelector<HTMLElement>('.v2-root--snap')
		const prevScrollerOverflow = scroller?.style.overflow ?? ''
		if (scroller) scroller.style.overflow = 'hidden'

		const scrollY = window.scrollY
		const prevBodyStyle = {
			position: document.body.style.position,
			top: document.body.style.top,
			width: document.body.style.width,
			overflow: document.body.style.overflow,
		}
		document.body.style.position = 'fixed'
		document.body.style.top = `-${scrollY}px`
		document.body.style.width = '100%'
		document.body.style.overflow = 'hidden'

		return () => {
			if (scroller) scroller.style.overflow = prevScrollerOverflow
			document.body.style.position = prevBodyStyle.position
			document.body.style.top = prevBodyStyle.top
			document.body.style.width = prevBodyStyle.width
			document.body.style.overflow = prevBodyStyle.overflow
			window.scrollTo(0, scrollY)
		}
	}, [activeProject])

	return (
		<ProjectModalContext.Provider
			value={{ activeProject, openProject, closeProject }}
		>
			{children}
		</ProjectModalContext.Provider>
	)
}

export const useProjectModal = () => useContext(ProjectModalContext)

export default ProjectModalProvider
