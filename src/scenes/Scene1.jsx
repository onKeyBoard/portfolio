import { Suspense, useState, useRef, useEffect, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import BlockyLoader from '../components/BlockyLoader/BlockyLoader'
import styles from './scenes.module.scss'

// The container we wrap around the canvas element
export default function CanvasContainer({ mouseX, zoomedIn }) {
	const containerRef = useRef(null)
	const bgPosX = useRef(0)

	useEffect(() => {
		let animationFrameId
		const animate = () => {
			if (containerRef.current && !zoomedIn) {
				bgPosX.current += (mouseX * 0.25 - bgPosX.current) * 0.1
				containerRef.current.style.backgroundPositionX = `-${bgPosX.current}px`
				animationFrameId = requestAnimationFrame(animate)
			}
		}
		animate()

		return () => {
			cancelAnimationFrame(animationFrameId)
		}
	}, [mouseX, zoomedIn, bgPosX])

	return (
		<section className={styles['canvas-container']} ref={containerRef}>
			<MainScene mouseX={mouseX} zoomedIn={zoomedIn} />
		</section>
	)
}

// The main scene component renders the 3D scene in a canvas
function MainScene({ mouseX, zoomedIn }) {
	return (
		<Canvas
			shadows
			camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 10] }}
		>
			<CameraController zoomedIn={zoomedIn} />
			<ambientLight intensity={0.5} />
			<fog attach='fog' args={['#121ed2', 5, 18]} />
			<spotLight
				angle={2}
				color='#ffffff'
				penumbra={0.5}
				position={[25, 50, -20]}
				shadow-mapSize={[4096, 4096]}
				shadow-bias={-0.0001}
				castShadow
				intensity={2}
			/>
			<Suspense
				fallback={
					<Html>
						<BlockyLoader />
					</Html>
				}
			>
				<PersonalComputer scale={10} position={[0, -2, 0]} mouseX={mouseX} />
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
		const geometry = new THREE.PlaneGeometry(2, 32)
		const material = new THREE.MeshBasicMaterial({
			color: 0x35354b,
		})

		const plane = new THREE.Mesh(geometry, material)

		// Here we position our plane flat in front of the camera
		plane.rotation.x = -Math.PI * 0.5
		plane.position.y = 0.0
		plane.position.z = 0.15

		scene.add(plane)
	}, [])

	useFrame(() => {
		// Normalize the mouse X coordinate to a value between -1 and 1
		const normalizedMouseX = (mouseX / window.innerWidth) * 2 - 1

		// Calculate the rotation based on the normalized mouse X coordinate
		const targetRotationY = (normalizedMouseX * Math.PI) / 8

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
		? new THREE.Vector3(0, 0, 4)
		: new THREE.Vector3(0, 1, 8)

	useFrame(() => {
		camera.position.lerp(targetPosition, 0.05)
		camera.lookAt(0, 0, 0)
		camera.updateProjectionMatrix()
	})

	return null
}

useGLTF.preload('3Dobjects/retro_mac/scene.gltf')
