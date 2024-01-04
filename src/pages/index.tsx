import { Suspense } from 'react'
import MainContent from '../components/MainContent/MainContent'
import BlockyLoader from '../components/BlockyLoader/BlockyLoader'

interface PageContentProps {
	children?: React.ReactNode
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
	return (
		<Suspense fallback={<BlockyLoader />}>
			<MainContent />
		</Suspense>
	)
}

export default PageContent
