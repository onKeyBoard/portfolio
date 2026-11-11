import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../../../queries/projects.js'
import V2PageShell from '../V2PageShell/V2PageShell'
import SiteHeader from '../SiteHeader/SiteHeader'
import SiteFooter from '../SiteFooter/SiteFooter'
import RevealSection from '../RevealSection/RevealSection'
import {
	isVideo,
	getCloudinaryImage,
	getCloudinarySrcSet,
} from '../../../utils/cloudinaryUtils'
import { getVisitLinkLabel } from '../../utils/linkLabel'
import styles from './ProjectPage.module.scss'

const HERO_WIDTHS = [640, 1024, 1600, 2200, 2880]
const SLIDE_WIDTHS = [640, 1024, 1600, 2400]

const VideoPlayer = dynamic(
	() => import('../../../components/VideoPlayer/VideoPlayer'),
	{ ssr: false }
)

interface ProjectSlide {
	id: string
	title: string
	description: string
	imageUrl: string
}

interface Project {
	id: string
	type: string[]
	year: string
	title: string
	description: string
	imageUrl: string
	link: string
	projectSlides?: ProjectSlide[]
}

const ProjectPage = () => {
	const [id, setId] = useState<string | undefined>(undefined)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		setId(params.get('id') ?? undefined)
	}, [])

	const { data, loading, error } = useQuery<{ project: Project }>(
		GET_PROJECT,
		{
			variables: { id },
			skip: !id,
		}
	)

	const project = data?.project

	return (
		<>
			<Head>
				<title key='title'>
					{project ? `${project.title} — Shawn Pavlas` : 'Project — Shawn Pavlas'}
				</title>
			</Head>
			<V2PageShell>
				<SiteHeader />

				{!id || loading ? (
					<div className={styles['status']}>Loading project…</div>
				) : error || !project ? (
					<div className={styles['status']}>
						<p>Couldn&apos;t find that project.</p>
						<Link href='/#work'>Back to work</Link>
					</div>
				) : (
					<article>
						{project.imageUrl ? (
							<div className={styles['heroImageWrap']}>
								<img
									className={styles['heroImage']}
									src={getCloudinaryImage(project.imageUrl, 1600)}
									srcSet={getCloudinarySrcSet(project.imageUrl, HERO_WIDTHS)}
									sizes='100vw'
									alt=''
								/>
								<Link href='/#work' className={styles['backPill']}>
									Back to work
								</Link>
							</div>
						) : (
							<div className={styles['backRow']}>
								<Link href='/#work' className={styles['backPill']}>
									Back to work
								</Link>
							</div>
						)}

						<RevealSection as='div' className={styles['intro']}>
							{project.type?.length > 0 && (
								<p className={styles['tags']}>
									{project.type.join(', ')}
								</p>
							)}
							<h1 className={styles['title']}>{project.title}</h1>
							{project.year && (
								<p className={styles['year']}>{project.year}</p>
							)}
							<p className={styles['lead']}>{project.description}</p>
							{project.link && (
								<a
									className={styles['link']}
									href={project.link}
									target='_blank'
									rel='noreferrer'
								>
									<span className={styles['linkInner']}>
										{getVisitLinkLabel(project.link)}
									</span>
								</a>
							)}
						</RevealSection>

						{project.projectSlides && project.projectSlides.length > 0 && (
							<div className={styles['slides']}>
								{project.projectSlides.map((slide) => (
									<RevealSection
										as='div'
										key={slide.id}
										className={styles['slide']}
									>
										{slide.imageUrl && (
											isVideo(slide.imageUrl) ? (
												<div className={styles['slideVideo']}>
													<VideoPlayer url={slide.imageUrl} />
												</div>
											) : (
												<img
													className={styles['slideImage']}
													src={getCloudinaryImage(slide.imageUrl, 1200)}
													srcSet={getCloudinarySrcSet(
														slide.imageUrl,
														SLIDE_WIDTHS
													)}
													sizes='(max-width: 1200px) 100vw, 1200px'
													loading='lazy'
													decoding='async'
													alt=''
												/>
											)
										)}
										<div className={styles['slideBody']}>
											<h2 className={styles['slideTitle']}>
												{slide.title}
											</h2>
											{slide.description && (
												<p className={styles['slideDescription']}>
													{slide.description}
												</p>
											)}
										</div>
									</RevealSection>
								))}
							</div>
						)}
					</article>
				)}

				<SiteFooter />
			</V2PageShell>
		</>
	)
}

export default ProjectPage
