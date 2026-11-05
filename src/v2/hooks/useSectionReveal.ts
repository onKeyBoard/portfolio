import { useEffect, useState } from 'react'
import { useActiveSectionId } from '../context/ActiveSectionContext'

const EXIT_DURATION = 420

const useSectionReveal = (id: string) => {
	const activeId = useActiveSectionId()
	const isActive = activeId === id
	const [isMounted, setIsMounted] = useState(isActive)
	const [isExiting, setIsExiting] = useState(false)

	useEffect(() => {
		if (isActive) {
			setIsMounted(true)
			setIsExiting(false)
			return
		}

		if (!isMounted) return

		setIsExiting(true)
		const timeout = window.setTimeout(() => {
			setIsMounted(false)
			setIsExiting(false)
		}, EXIT_DURATION)

		return () => window.clearTimeout(timeout)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isActive])

	return { isMounted, isExiting }
}

export default useSectionReveal
