import React from 'react'
import Head from 'next/head'
import V2PageShell from '../V2PageShell/V2PageShell'
import ActiveSectionProvider from '../../context/ActiveSectionContext'
import ProjectModalProvider from '../../context/ProjectModalContext'
import SiteHeader from '../SiteHeader/SiteHeader'
import Hero from '../Hero/Hero'
import SectionHello from '../SectionHello/SectionHello'
import SectionSkills from '../SectionSkills/SectionSkills'
import SectionWork from '../SectionWork/SectionWork'
import SectionExtras from '../SectionExtras/SectionExtras'
import ProjectModal from '../ProjectModal/ProjectModal'

const HomePage = () => {
	return (
		<>
			<Head>
				<title key='title'>Shawn Pavlas — UX Designer / Engineer</title>
			</Head>
			<V2PageShell panelScroll>
				<ActiveSectionProvider>
					<ProjectModalProvider>
						<SiteHeader />
						<Hero />
						<SectionHello />
						<SectionSkills />
						<SectionWork />
						<SectionExtras />
						<ProjectModal />
					</ProjectModalProvider>
				</ActiveSectionProvider>
			</V2PageShell>
		</>
	)
}

export default HomePage
