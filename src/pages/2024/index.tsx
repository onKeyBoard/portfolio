import { Suspense } from 'react'
import ThemeProvider from '../../context/ThemeProvider'
import MainContent from '../../components/MainContent/MainContent'
import BlockyLoader from '../../components/BlockyLoader/BlockyLoader'
import Head from 'next/head'

const Page2024 = () => {
	return (
		<>
			<Head>
				<title key='title'>Shawn Pavlas - Porfolio</title>
			</Head>
			<Suspense fallback={<BlockyLoader />}>
				<ThemeProvider>
					<MainContent />
				</ThemeProvider>
			</Suspense>
		</>
	)
}

export default Page2024
