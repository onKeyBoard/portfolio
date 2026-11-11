import {
	faUsers,
	faClipboardCheck,
	faDiagramProject,
	faPenRuler,
	faShapes,
	faUniversalAccess,
	faWandMagicSparkles,
	faDatabase,
	faSitemap,
	faChartLine,
	faHandPointer,
	faCubes,
	faMobileScreen,
	faArrowsUpDown,
	faArrowPointer,
	faPaintbrush,
	faPlug,
	faTableList,
	faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export interface Skill {
	id: string
	title: string
	description: string
	iconUrl?: string
	faIcon?: IconDefinition
}

export interface SkillCategory {
	id: string
	title: string
	tag: string
	summary: string
	skills: Skill[]
}

const icon = (path: string) =>
	`https://res.cloudinary.com/dvydp3fnf/image/upload/${path}`

export const skillCategories: SkillCategory[] = [
	{
		id: 'ux-product-design',
		title: 'UX & Product Design',
		tag: 'Design',
		summary:
			'I start with the people I’m designing for: researching, testing ideas early, and mapping how they move through a product before shaping it in Figma.',
		skills: [
			{
				id: 'user-research',
				title: 'User research',
				description:
					'Most of my work starts with getting to know the people I’m designing for, so my designs are shaped by evidence instead of assumptions.',
				faIcon: faUsers,
			},
			{
				id: 'usability-testing',
				title: 'Usability testing',
				description:
					'I run usability studies, watch how people move through a product, and test ideas early, then rely on real data to tell me whether it’s working.',
				faIcon: faClipboardCheck,
			},
			{
				id: 'information-architecture',
				title: 'Information architecture',
				description:
					'I organize content and navigation so people can find what they need, like making Micron’s deep product catalog easy to browse.',
				faIcon: faSitemap,
			},
			{
				id: 'interaction-design',
				title: 'Interaction design',
				description:
					'I design how an interface responds to people, so every click, hover, and transition feels clear and intentional.',
				faIcon: faHandPointer,
			},
			{
				id: 'data-informed-design',
				title: 'Data-informed design',
				description:
					'I rely on real data to tell me whether a design is working, and use it to decide what to improve next.',
				faIcon: faChartLine,
			},
			{
				id: 'user-flows',
				title: 'User flows & journey mapping',
				description:
					'Every user arrives with a goal, a state of mind, and a reason to leave. I map those journeys so the path to their goal feels effortless.',
				faIcon: faDiagramProject,
			},
			{
				id: 'wireframing-prototyping',
				title: 'Wireframing & prototyping',
				description:
					'I sketch and prototype ideas early so they can be tested and refined before any production code gets written.',
				faIcon: faPenRuler,
			},
			{
				id: 'design-systems',
				title: 'Design systems',
				description:
					'I build reusable components and shared styles that keep design and code consistent as a product grows.',
				faIcon: faShapes,
			},
			{
				id: 'accessibility',
				title: 'Accessibility',
				description:
					'I design and build interfaces that work for everyone, with keyboard support, readable contrast, and semantic markup.',
				faIcon: faUniversalAccess,
			},
			{
				id: 'figma',
				title: 'Figma',
				description:
					'Figma is where my designs take shape, from early layouts to polished UI, like the Crownhunt LMS app I designed and then built.',
				iconUrl: icon('v1702233457/Portfolio/figma_x9zqnx.png'),
			},
		],
	},
	{
		id: 'front-end-engineering',
		title: 'Front-End Engineering',
		tag: 'Code',
		summary:
			'I take designs into production myself, building React and TypeScript front ends on semantic markup and well-organized styles.',
		skills: [
			{
				id: 'component-architecture',
				title: 'Component architecture',
				description:
					'I build interfaces from reusable, well-typed components so designs stay consistent and code stays easy to change.',
				faIcon: faCubes,
			},
			{
				id: 'responsive-layouts',
				title: 'Responsive layouts',
				description:
					'I build layouts that adapt cleanly from phones to large screens.',
				faIcon: faMobileScreen,
			},
			{
				id: 'react',
				title: 'React',
				description:
					'I take designs from Figma into React myself, as I did building the front-end features of Crownhunt’s LMS app.',
				iconUrl: icon('v1702186992/Portfolio/react_escla7.png'),
			},
			{
				id: 'nextjs',
				title: 'Next.js',
				description:
					'I use Next.js for React sites that need fast, routed pages, including this portfolio.',
				iconUrl: icon('v1702187577/Portfolio/nextdotjs_qeulkt.png'),
			},
			{
				id: 'typescript',
				title: 'TypeScript',
				description:
					'I write my React work in TypeScript, as on the Crownhunt app, so components stay predictable as a project grows.',
				iconUrl: icon('v1702195912/Portfolio/typescript_kzkke0.png'),
			},
			{
				id: 'javascript',
				title: 'JavaScript',
				description:
					'JavaScript is where I started. For Micron.com I built a Vanilla JS part catalog where users configure, reorder, filter, and sort columns.',
				iconUrl: icon('v1702186681/Portfolio/javascript_d6cftw.png'),
			},
			{
				id: 'html5',
				title: 'HTML5',
				description:
					'I write semantic, accessible markup as the foundation for every interface I build.',
				iconUrl: icon('v1702187584/Portfolio/html5_jc2kgf.png'),
			},
			{
				id: 'css3',
				title: 'CSS3',
				description:
					'I use CSS for layout, responsive design, and interaction, like the animated landing page experience I built for ProKarma.',
				iconUrl: icon('v1702187595/Portfolio/css3_mkxktb.png'),
			},
			{
				id: 'sass',
				title: 'Sass',
				description:
					'I organize styles with Sass modules, mixins, and shared tokens, as in this site.',
				iconUrl: icon('v1702186556/Portfolio/sass_ycyiul.png'),
			},
			{
				id: 'less',
				title: 'Less',
				description:
					'I’ve worked in Less stylesheets on projects that use it as their preprocessor.',
				iconUrl: icon('v1702233436/Portfolio/less_ixhu07.png'),
			},
		],
	},
	{
		id: 'interaction-motion',
		title: 'Interaction & Motion',
		tag: 'Craft',
		summary:
			'I use motion and 3D to make interfaces feel alive, from scroll-driven GSAP pages to hand-drawn animation.',
		skills: [
			{
				id: 'motion-design',
				title: 'Motion design',
				description:
					'From hand-drawn animation in Procreate to a looping parallax scene in Unity, I use motion to make interfaces and stories feel alive.',
				faIcon: faWandMagicSparkles,
			},
			{
				id: 'scroll-animation',
				title: 'Scroll-driven animation',
				description:
					'I built scroll-animated pages for Intel’s in-store displays, tying motion to how people move through content.',
				faIcon: faArrowsUpDown,
			},
			{
				id: 'micro-interactions',
				title: 'Micro-interactions',
				description:
					'Small, purposeful interactions, like the demo I built for ProKarma that inspired key features of their landing page.',
				faIcon: faArrowPointer,
			},
			{
				id: 'illustration',
				title: 'Illustration',
				description:
					'Drawing daily grew into Coffee Hotline, my web comic and apparel brand, and hand-drawn animations like a looping cozy cabin scene.',
				faIcon: faPaintbrush,
			},
			{
				id: 'greensock',
				title: 'GreenSock',
				description:
					'I built a series of scroll-animated pages for Intel’s in-store promotional displays using React and GSAP.',
				iconUrl: icon('v1702187588/Portfolio/greensock_sjmhdm.png'),
			},
			{
				id: 'threejs',
				title: 'Three.js',
				description:
					'I use Three.js to bring 3D scenes and interactive visuals to the web.',
				iconUrl: icon('v1702186861/Portfolio/threedotjs_lixt6l.png'),
			},
		],
	},
	{
		id: 'data-back-end',
		title: 'Data & Back-End',
		tag: 'APIs',
		summary:
			'I build front ends against REST and GraphQL APIs, design interfaces for complex data, and structure content in a headless CMS.',
		skills: [
			{
				id: 'rest-apis',
				title: 'REST APIs',
				description:
					'I build front ends that fetch and send data through REST APIs.',
				faIcon: faPlug,
			},
			{
				id: 'complex-data-interfaces',
				title: 'Complex data interfaces',
				description:
					'For Micron.com I built a part catalog where users configure, reorder, filter, and sort columns across a huge product range.',
				faIcon: faTableList,
			},
			{
				id: 'content-modeling',
				title: 'Content modeling',
				description:
					'I structure content in a headless CMS so it’s easy to edit and query, as with this portfolio in Hygraph.',
				faIcon: faLayerGroup,
			},
			{
				id: 'graphql',
				title: 'GraphQL',
				description:
					'I build front ends against GraphQL APIs, as on Crownhunt, where I worked alongside the developer building the API.',
				iconUrl: icon('v1702186771/Portfolio/graphql_uhynng.png'),
			},
			{
				id: 'apollo',
				title: 'Apollo',
				description:
					'I use Apollo Client to query and cache GraphQL data in React apps, including this portfolio.',
				iconUrl: icon('v1702187599/Portfolio/apollographql_ktrvuh.png'),
			},
			{
				id: 'nodejs',
				title: 'Node.js',
				description:
					'I use Node.js for build tooling, scripts, and the server side of JavaScript projects.',
				iconUrl: icon('v1702233459/Portfolio/nodedotjs_wdxd2l.png'),
			},
			{
				id: 'python',
				title: 'Python',
				description: 'I use Python for scripting and automating everyday tasks.',
				iconUrl: icon('v1702233479/Portfolio/python_lzuipu.png'),
			},
			{
				id: 'headless-cms',
				title: 'Headless CMS (Hygraph)',
				description:
					'This portfolio’s content lives in Hygraph, a headless CMS, so I can update projects without touching code.',
				faIcon: faDatabase,
			},
		],
	},
	{
		id: 'tooling-platforms',
		title: 'Tooling & Platforms',
		tag: 'Ship',
		summary:
			'The everyday tools and platforms I use to build, version, and ship projects.',
		skills: [
			{
				id: 'git',
				title: 'Git',
				description:
					'I use Git every day for version control and collaborating with other developers.',
				iconUrl: icon('v1702187592/Portfolio/git_ot8pkn.png'),
			},
			{
				id: 'npm',
				title: 'NPM',
				description: 'I manage project dependencies and scripts with npm.',
				iconUrl: icon('v1702187573/Portfolio/npm_aemwlk.png'),
			},
			{
				id: 'webpack',
				title: 'Webpack',
				description:
					'I configure Webpack builds to bundle and optimize front-end code.',
				iconUrl: icon('v1702233482/Portfolio/webpack_syfb88.png'),
			},
			{
				id: 'linux',
				title: 'Linux',
				description:
					'I’m comfortable on the command line and working in Linux environments.',
				iconUrl: icon('v1702187581/Portfolio/linux_mfzlpx.png'),
			},
			{
				id: 'shopify',
				title: 'Shopify',
				description:
					'I’ve built and customized Shopify storefronts and themes.',
				iconUrl: icon('v1702233481/Portfolio/shopify_xz92rl.png'),
			},
			{
				id: 'wordpress',
				title: 'WordPress',
				description:
					'I’ve built and customized WordPress sites and themes.',
				iconUrl: icon('v1702233484/Portfolio/wordpress_yx86fz.png'),
			},
		],
	},
]
