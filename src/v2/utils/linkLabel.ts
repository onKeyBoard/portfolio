const PLATFORM_LABELS: Record<string, string> = {
	'youtube.com': 'View on YouTube',
	'youtu.be': 'View on YouTube',
	'instagram.com': 'See more on Instagram',
	'github.com': 'View on GitHub',
	'behance.net': 'View on Behance',
	'dribbble.com': 'View on Dribbble',
	'linkedin.com': 'View on LinkedIn',
	'vimeo.com': 'Watch on Vimeo',
	'figma.com': 'View in Figma',
}

export const getVisitLinkLabel = (url: string): string => {
	try {
		const hostname = new URL(url).hostname.replace(/^www\./, '')
		return PLATFORM_LABELS[hostname] ?? `Visit ${hostname}`
	} catch {
		return 'Visit live site'
	}
}
