import { Suspense } from 'react'
import MainContent from '../components/MainContent/MainContent'
import BlockyLoader from '../components/BlockyLoader/BlockyLoader'

const PageContent = () => {
	return (
		<Suspense fallback={<BlockyLoader />}>
			<MainContent />
		</Suspense>
	)
}

export default PageContent
