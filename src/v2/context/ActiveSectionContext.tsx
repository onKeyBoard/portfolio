import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'

export const PANEL_IDS = ['top', 'hello', 'skills', 'work', 'extras']

const DESKTOP_QUERY = '(min-width: 900px)'

interface ActiveSectionContextValue {
	activeId: string
	navigateToSection: (id: string, instant: boolean) => void
}

const ActiveSectionContext = createContext<ActiveSectionContextValue | null>(
	null
)

const ActiveSectionProvider = ({ children }: { children: React.ReactNode }) => {
	const [activeId, setActiveId] = useState('top')
	const activeIdRef = useRef(activeId)
	activeIdRef.current = activeId

	useEffect(() => {
		const root = document.querySelector<HTMLElement>('.v2-root--snap')
		root?.setAttribute('data-active-mobile-section', activeId)
	}, [activeId])

	const navigateToSection = useCallback((id: string, instant: boolean) => {
		const panel = document.getElementById(id)
		if (!panel) return

		if (!window.matchMedia(DESKTOP_QUERY).matches) {
			panel.scrollTop = 0
			setActiveId(id)
			return
		}

		if (!instant) {
			panel.scrollIntoView({ behavior: 'smooth', block: 'start' })
			return
		}

		const scroller = document.querySelector<HTMLElement>('.v2-root--snap')
		if (!scroller) {
			panel.scrollIntoView({ block: 'start' })
			return
		}

		const prevSnapType = scroller.style.scrollSnapType
		const prevBehavior = scroller.style.scrollBehavior
		scroller.style.scrollSnapType = 'none'
		scroller.style.scrollBehavior = 'auto'
		panel.scrollIntoView({ block: 'start' })
		requestAnimationFrame(() => {
			scroller.style.scrollSnapType = prevSnapType
			scroller.style.scrollBehavior = prevBehavior
		})
	}, [])

	useEffect(() => {
		const jumpToHash = () => {
			const id = window.location.hash.slice(1)
			if (PANEL_IDS.includes(id)) navigateToSection(id, true)
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
		const elements = PANEL_IDS.map((id) => document.getElementById(id)).filter(
			(el): el is HTMLElement => !!el
		)
		if (!elements.length) return

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActiveId(entry.target.id)
				})
			},
			// -50% collapses to a zero-height band that never intersects.
			{ rootMargin: '-49% 0px -49% 0px', threshold: 0 }
		)

		elements.forEach((el) => observer.observe(el))
		return () => observer.disconnect()
	}, [])

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
			navigateToSection(PANEL_IDS[nextIndex], false)
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
