import { test } from 'node:test'
import assert from 'node:assert/strict'
import { skillCategories } from './skills.ts'

const EXPECTED = [
	{
		title: 'UX & Product Design',
		tag: 'Design',
		skills: [
			'User research',
			'Usability testing',
			'Information architecture',
			'Interaction design',
			'Data-informed design',
			'User flows & journey mapping',
			'Wireframing & prototyping',
			'Design systems',
			'Accessibility',
			'Figma',
		],
	},
	{
		title: 'Front-End Engineering',
		tag: 'Code',
		skills: ['Component architecture', 'Responsive layouts', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Sass', 'Less'],
	},
	{
		title: 'Interaction & Motion',
		tag: 'Craft',
		skills: ['Motion design', 'Scroll-driven animation', 'Micro-interactions', 'Illustration', 'GreenSock', 'Three.js'],
	},
	{
		title: 'Data & Back-End',
		tag: 'APIs',
		skills: ['REST APIs', 'Complex data interfaces', 'Content modeling', 'GraphQL', 'Apollo', 'Node.js', 'Python', 'Headless CMS (Hygraph)'],
	},
	{
		title: 'Tooling & Platforms',
		tag: 'Ship',
		skills: ['Git', 'NPM', 'Webpack', 'Linux', 'Shopify', 'WordPress'],
	},
]

const allSkills = () => skillCategories.flatMap((c) => c.skills)

test('categories in order', () => {
	assert.deepEqual(
		skillCategories.map((c) => c.title),
		EXPECTED.map((c) => c.title)
	)
	assert.deepEqual(
		skillCategories.map((c) => c.tag),
		EXPECTED.map((c) => c.tag)
	)
})

test('skill counts', () => {
	assert.deepEqual(
		skillCategories.map((c) => c.skills.length),
		[10, 10, 6, 8, 6]
	)
	assert.equal(allSkills().length, 40)
})

test('skill order', () => {
	skillCategories.forEach((c, i) => {
		assert.deepEqual(
			c.skills.map((s) => s.title),
			EXPECTED[i].skills
		)
	})
})

test('ids unique', () => {
	const ids = [...skillCategories.map((c) => c.id), ...allSkills().map((s) => s.id)]
	assert.equal(new Set(ids).size, ids.length)
})

test('every skill has an icon', () => {
	for (const s of allSkills()) {
		assert.ok(s.iconUrl || s.faIcon, `${s.title} has no icon`)
	}
})

test('descriptions', () => {
	for (const s of allSkills()) {
		assert.ok(s.description.trim().length > 0, `${s.title} has no description`)
		assert.ok(s.description.length <= 240, `${s.title} description too long`)
	}
})

test('every category has a summary', () => {
	for (const c of skillCategories) {
		assert.ok(c.summary?.trim().length > 0, `${c.title} has no summary`)
		assert.ok(c.summary.length <= 200, `${c.title} summary too long`)
	}
})
