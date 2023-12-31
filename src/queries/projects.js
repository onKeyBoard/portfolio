import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
	query Projects($category: ProjectCategory!) {
		projects(where: { category: $category }) {
			id
			type
			year
			title
			description
			imageUrl
			link
			projectSlides {
				id
				title
				description
				imageUrl
			}
		}
	}
`
// This returns the basic information for each project
export const GET_PROJECTS_SIMPLE = gql`
	query ProjectsBasic($category: ProjectCategory!) {
		projects(where: { category: $category }) {
			id
			type
			year
			title
			imageUrl
		}
	}
`
export const GET_PROJECT = gql`
	query Project($id: ID!) {
		project(where: { id: $id }) {
			id
			type
			year
			title
			description
			imageUrl
			link
			projectSlides {
				id
				title
				description
				imageUrl
			}
		}
	}
`
