import React from 'react'
import Head from 'next/head'
import V2PageShell from '../V2PageShell/V2PageShell'
import ActiveSectionProvider from '../../context/ActiveSectionContext'
import SiteBar from '../SiteBar/SiteBar'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import Hero from '../Hero/Hero'
import SectionHello from '../SectionHello/SectionHello'
import SectionSkills from '../SectionSkills/SectionSkills'
import SectionWork from '../SectionWork/SectionWork'
import SectionExtras from '../SectionExtras/SectionExtras'

const HomePage = () => {
	return (
		<>
			<Head>
				<title key='title'>Shawn Pavlas — UX Designer / Engineer</title>
			</Head>
			<V2PageShell panelScroll>
				<ActiveSectionProvider>
					<Hero />
					<SectionHello />
					<SectionSkills />
					<SectionWork />
					<SectionExtras />
					<SiteBar />
					<ThemeToggle />
				</ActiveSectionProvider>
			</V2PageShell>
		</>
	)
}

export default HomePage
