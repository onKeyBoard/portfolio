import React, { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'

const HoverTilter = ({ children, inverted, disable }) => {
	const tiltRef = useRef(null)

	useEffect(() => {
		VanillaTilt.init(tiltRef.current, {
			max: disable ? 0 : 8,
			reverse: inverted,
			speed: 400,
			glare: false,
			'glare-prerender': false,
		})
		//cleanup function
		return () => {
			if (tiltRef.current && tiltRef.current.vanillaTilt) {
				tiltRef.current.vanillaTilt.destroy()
			}
		}
	}, [])

	return (
		<div style={{ height: '100%' }} ref={tiltRef} className='tilt-root'>
			<div style={{ height: '100%' }} className='tilt-child'>
				{children}
			</div>
		</div>
	)
}

export default HoverTilter
