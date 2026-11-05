import { useEffect, useRef, useState } from 'react'

const useScrollReveal = <T extends HTMLElement>(threshold = 0.2) => {
	const ref = useRef<T>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const node = ref.current
		if (!node) return

		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches

		if (prefersReducedMotion) {
			setIsVisible(true)
			return
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.disconnect()
				}
			},
			{ threshold, rootMargin: '0px 0px -10% 0px' }
		)

		observer.observe(node)
		return () => observer.disconnect()
	}, [threshold])

	return { ref, isVisible }
}

export default useScrollReveal
