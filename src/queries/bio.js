import { gql } from '@apollo/client'

export const GET_BIO = gql`
	query Bio {
		bio(where: { id: "clpyvyvbx28qg0alq2noy4ipj" }) {
			id
			profileImageUrl
			headline
			body {
				raw
			}
		}
	}
`
