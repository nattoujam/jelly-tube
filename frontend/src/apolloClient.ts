import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

const httpLink = createUploadLink({
  // You should use an absolute URL
  uri: import.meta.env.VITE_BACKEND_ENDPOINT
})

// Cache implementation
const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

export default apolloClient
