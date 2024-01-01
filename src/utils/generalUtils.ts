export default function limitMouseX(mouseX: number, limit: number) {
	// Normalize the mouse X coordinate to a value between -1 and 1
	const normalizedMouseX = (mouseX / window.innerWidth) * 2 - 1
	// return a calculated number based on the normalized mouse X coordinate
	return (normalizedMouseX * Math.PI) / limit
}
