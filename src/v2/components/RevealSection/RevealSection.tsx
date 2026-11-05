import React from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './RevealSection.module.scss'

interface RevealSectionProps {
	children: React.ReactNode
	as?: keyof JSX.IntrinsicElements
	className?: string
	id?: string
}

const RevealSection = ({
	children,
	as = 'div',
	className = '',
	id,
}: RevealSectionProps) => {
	const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

	return React.createElement(
		as,
		{
			ref,
			id,
			className: `${styles['reveal']} ${
				isVisible ? styles['visible'] : ''
			} ${className}`,
		},
		children
	)
}

export default RevealSection
