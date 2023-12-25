import { gql } from '@apollo/client'

export const GET_SKILLS = gql`
	query Skills {
		skills(first: 21, orderBy: title_ASC) {
			title
			id
			iconUrl
		}
	}
`
