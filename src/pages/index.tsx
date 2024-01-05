import { Suspense } from 'react'
import MainContent from '../components/MainContent/MainContent'
import BlockyLoader from '../components/BlockyLoader/BlockyLoader'
import Head from 'next/head'

interface PageContentProps {
	children?: React.ReactNode
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
	return (
		<>
			<Head>
				<title key='title'>Shawn Pavlas - Porfolio</title>
			</Head>
			<Suspense fallback={<BlockyLoader />}>
				<MainContent />
			</Suspense>
		</>
	)
}

export default PageContent
