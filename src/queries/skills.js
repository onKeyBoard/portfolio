import { gql } from '@apollo/client'

export const GET_SKILLS = gql`
	query Skills {
		skills(first: 20) {
			title
			id
			iconUrl
		}
	}
`
