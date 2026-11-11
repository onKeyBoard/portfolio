import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'

export const PANEL_IDS = ['top', 'hello', 'skills', 'work', 'extras']

interface ActiveSectionContextValue {
	activeId: string
	navigateToSection: (id: string) => void
}

const ActiveSectionContext = createContext<ActiveSectionContextValue | null>(
	null
)

const ActiveSectionProvider = ({ children }: { children: React.ReactNode }) => {
	const [activeId, setActiveId] = useState('top')
	const activeIdRef = useRef(activeId)
	activeIdRef.current = activeId

	const previousIdRef = useRef<string | null>(null)
	useEffect(() => {
		const root = document.querySelector<HTMLElement>('.v2-root--paged')
		root?.setAttribute('data-previous-section', previousIdRef.current ?? '')
		root?.setAttribute('data-active-section', activeId)
		previousIdRef.current = activeId
	}, [activeId])

	const navigateToSection = useCallback((id: string) => {
		const panel = document.getElementById(id)
		if (!panel) return
		panel.scrollTop = 0
		setActiveId(id)
	}, [])

	useEffect(() => {
		const jumpToHash = () => {
			const id = window.location.hash.slice(1)
			if (PANEL_IDS.includes(id)) navigateToSection(id)
		}
		jumpToHash()
		window.addEventListener('hashchange', jumpToHash)
		return () => window.removeEventListener('hashchange', jumpToHash)
	}, [navigateToSection])

	const isFirstSync = useRef(true)
	useEffect(() => {
		// Skip mount: activeId is still the 'top' default, not the loaded hash.
		if (isFirstSync.current) {
			isFirstSync.current = false
			return
		}
		const { pathname, search } = window.location
		const url = activeId === 'top' ? pathname + search : `${pathname}${search}#${activeId}`
		window.history.replaceState(window.history.state, '', url)
	}, [activeId])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return

			const target = event.target as HTMLElement | null
			const isFormField =
				target &&
				(['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
					target.isContentEditable)
			if (isFormField) return

			if (document.querySelector('[role="dialog"]')) return

			const currentIndex = PANEL_IDS.indexOf(activeIdRef.current)
			if (currentIndex === -1) return

			const nextIndex =
				event.key === 'ArrowDown'
					? Math.min(currentIndex + 1, PANEL_IDS.length - 1)
					: Math.max(currentIndex - 1, 0)
			if (nextIndex === currentIndex) return

			event.preventDefault()
			navigateToSection(PANEL_IDS[nextIndex])
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [navigateToSection])

	return (
		<ActiveSectionContext.Provider value={{ activeId, navigateToSection }}>
			{children}
		</ActiveSectionContext.Provider>
	)
}

export const useActiveSectionId = () =>
	useContext(ActiveSectionContext)?.activeId ?? null

const noopNavigate = () => {}

export const useSectionNavigation = () =>
	useContext(ActiveSectionContext)?.navigateToSection ?? noopNavigate

export default ActiveSectionProvider
