import React from 'react'
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
	NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import '../styles/styles.scss'
import '../v2/styles/global.scss'

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_HYGRAPH_API_URL,
})

const authLink = setContext((_, { headers }) => {
	const token = process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN
	return {
		headers: {
			...headers,
			'gcms-stage': 'PUBLISHED',
			'x-api-key': token,
			authorization: `Bearer ${token}`,
		},
	}
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})

interface IProps {
	Component: React.FC
	pageProps: object
}

const MyApp: React.FC<IProps> = ({ Component, pageProps }) => {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

export default MyApp
