import { Suspense, useState, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import limitMouseX from '../../utils/generalUtils'
import { useGLTF, Html } from '@react-three/drei'
import BlockyLoader from '../BlockyLoader/BlockyLoader'
import styles from './Scene3D.module.scss'

// The main scene component renders the 3D scene in a canvas
export default function Scene3D({ mouseX, zoomedIn }) {
	// TODO: Fix positioning of Html overlay on line 20
	return (
		<Canvas
			shadows
			camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 10] }}
			className={styles['scene']}
		>
			<CameraController zoomedIn={zoomedIn} />
			<ambientLight intensity={0.5} />
			<fog attach='fog' args={['#121ed2', 0, 30]} />
			<Suspense
				fallback={
					<Html>
						<BlockyLoader />
					</Html>
				}
			>
				<PersonalComputer scale={10} position={[0, -2, -3]} mouseX={mouseX} />
			</Suspense>
		</Canvas>
	)
}
// The 3D object component
function PersonalComputer({ mouseX, ...props }) {
	const [rotationY, setRotationY] = useState(0)
	const { scene, nodes } = useGLTF('3Dobjects/retro_mac/scene.gltf')

	useLayoutEffect(() => {
		Object.values(nodes).forEach(
			(node) => (node.receiveShadow = node.castShadow = true)
		)
		const geometry = new THREE.CircleGeometry(2, 32)
		const material = new THREE.MeshBasicMaterial({
			color: 0x31153c,
		})

		const plane = new THREE.Mesh(geometry, material)

		// Here we position our plane flat in front of the camera
		plane.rotation.x = -Math.PI * 0.5
		plane.position.y = 0.0
		plane.position.z = 0.15

		scene.add(plane)
	}, [])

	useFrame(() => {
		// Calculate the rotation based on the normalized mouse X coordinate
		const targetRotationY = limitMouseX(mouseX, 6)

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
		? new THREE.Vector3(1, 1, 0)
		: new THREE.Vector3(0, 1, 9)

	useFrame(() => {
		camera.position.lerp(targetPosition, 0.02)
		camera.lookAt(0, 0, 0)
		camera.updateProjectionMatrix()
	})

	return null
}

useGLTF.preload('3Dobjects/retro_mac/scene.gltf')
