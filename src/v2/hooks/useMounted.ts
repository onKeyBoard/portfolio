import { useEffect, useState } from 'react'

// Gates client-only data until after hydration to avoid an SSR mismatch.
const useMounted = () => {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])
	return mounted
}

export default useMounted
