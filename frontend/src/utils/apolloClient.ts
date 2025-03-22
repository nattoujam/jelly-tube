import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { getAuthInfo } from '@/utils/auth'

const httpLink = createUploadLink({
  uri: import.meta.env.VITE_BACKEND_ENDPOINT
})

const authLink = setContext((_, { headers }) => {
  const authInfo = getAuthInfo()
  return {
    headers: {
      ...headers,
      ...authInfo
    }
  }
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
})

export default apolloClient
