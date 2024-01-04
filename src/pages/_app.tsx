import React from 'react'
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
	NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import PageContent from './index'
import '../styles/styles.scss'

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
			<PageContent>
				<Component {...pageProps} />
			</PageContent>
		</ApolloProvider>
	)
}

export default MyApp
