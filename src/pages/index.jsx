import { Suspense } from 'react'
import PageHero from '../components/PageHero/PageHero'
import BlockyLoader from '../components/BlockyLoader/BlockyLoader'

const PageContent = () => {
	return (
		<Suspense fallback={<BlockyLoader />}>
			<PageHero />
		</Suspense>
	)
}

export default PageContent
