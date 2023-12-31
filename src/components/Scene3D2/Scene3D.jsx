import { Suspense, useState, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import limitMouseX from '../../utils/generalUtils'
import { useGLTF, Html } from '@react-three/drei'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import styles from './Scene3D.module.scss'

// The main scene component renders the 3D scene in a canvas
export default function Scene3D({ mouseX, zoomedIn }) {
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
				<PersonalComputer scale={1.1} position={[0, -1.5, 0]} mouseX={mouseX} />
			</Suspense>
		</Canvas>
	)
}
// The 3D object component
function PersonalComputer({ mouseX, ...props }) {
	const [rotationY, setRotationY] = useState(0)
	const { scene } = useGLTF('3Dobjects/office_window/scene.gltf')

	useFrame(() => {
		// Calculate the rotation based on the normalized mouse X coordinate
		const targetRotationY = -limitMouseX(mouseX, 12)

		// Use the lerp function to calculate the new rotation with a smoothing effect
		const newRotationY = THREE.MathUtils.lerp(rotationY, targetRotationY, 0.05)

		// Update the rotation state variable
		setRotationY(newRotationY)

		// Apply the calculated rotation to the 3D object
		scene.rotation.y = newRotationY
	})

	return <primitive object={scene} {...props} />
}
// Toggle the camera position between zoomed in and zoomed out
function CameraController({ zoomedIn }) {
	const { camera } = useThree()
	const targetPosition = zoomedIn
		? new THREE.Vector3(1, 1, -2)
		: new THREE.Vector3(0, 1, 9)

	useFrame(() => {
		camera.position.lerp(targetPosition, 0.01)
		camera.lookAt(0, 0, 0)
		camera.updateProjectionMatrix()
	})

	return null
}

useGLTF.preload('3Dobjects/office_window/scene.gltf')
