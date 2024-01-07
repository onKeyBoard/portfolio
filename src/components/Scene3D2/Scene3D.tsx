import React, { Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import limitMouseX from '../../utils/generalUtils'
import { useGLTF, Html } from '@react-three/drei'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import styles from './Scene3D.module.scss'

interface Scene3DProps {
	mouseX: number
	zoomedIn: boolean
}

// The main scene component renders the 3D scene in a canvas
export default function Scene3D({ mouseX, zoomedIn }: Scene3DProps) {
	return (
		<Canvas
			shadows
			camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 10] }}
			className={styles['scene']}
		>
			<CameraController zoomedIn={zoomedIn} />
			<ambientLight intensity={0.5} />
			<Suspense
				fallback={
					<Html>
						<BlockyLoader />
					</Html>
				}
			>
				<PersonalComputer
					scale={1.1}
					position={[0, -1.5, 0]}
					mouseX={mouseX}
					zoomedIn={zoomedIn}
				/>
			</Suspense>
		</Canvas>
	)
}
// The 3D object component
function PersonalComputer({ mouseX, zoomedIn, ...props }) {
	// Rotation state variable
	const [rotationY, setRotationY] = useState(0)
	// The 3D object file path, with a failsafe for social network sharing
	const url = new URL(
		'3Dobjects/office_window/scene.gltf',
		window.location.href
	)
	url.search = '' // this part removes any query string from the url
	const cleanUrl = url.href

	const { scene } = useGLTF(cleanUrl)

	useFrame(() => {
		// Calculate the rotation based on the normalized mouse X coordinate
		const targetRotationY = -limitMouseX(mouseX, 12)

		// Use the lerp function to calculate the new rotation with a smoothing effect
		const newRotationY = THREE.MathUtils.lerp(rotationY, targetRotationY, 0.05)

		// Update the rotation state variable
		!zoomedIn && setRotationY(newRotationY)

		// Apply the calculated rotation to the 3D object
		scene.rotation.y = newRotationY
	})

	return <primitive object={scene} {...props} />
}
// Toggle the camera position between zoomed in and zoomed out
function CameraController({ zoomedIn }) {
	const [initialZoom, setInitialZoom] = useState(true)
	const { camera } = useThree()

	useEffect(() => {
		// start the camera from a very zoomed in position
		camera.position.set(0, 1, 1)
		camera.lookAt(0, 0, 0)
		camera.updateProjectionMatrix()
	}, [])

	const targetPosition = zoomedIn
		? new THREE.Vector3(0, 1, 6)
		: new THREE.Vector3(0, 1, 9)

	useFrame(() => {
		if (initialZoom && !zoomedIn) {
			// If it's the initial zoom, move the camera to the default position
			camera.position.lerp(new THREE.Vector3(0, 1, 9), 0.02)
			if (camera.position.distanceTo(new THREE.Vector3(0, 1, 9)) < 0.1) {
				// If the camera is close enough to the default position, stop the initial zoom
				setInitialZoom(false)
			}
		} else {
			// If it's not the initial zoom, move the camera to the target position
			camera.position.lerp(targetPosition, 0.05)
		}
		camera.lookAt(0, 0, 0)
		camera.updateProjectionMatrix()
	})

	return null
}

useGLTF.preload('3Dobjects/office_window/scene.gltf')
