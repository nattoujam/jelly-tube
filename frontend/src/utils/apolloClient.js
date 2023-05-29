/**
 * @file             : apolloClient.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/29
 * Last Modified Date: 2023 05/29
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
// import { HttpLink } from 'apollo-link-http'

const api_domain = 'jelly-fish.local'
const api_port = '3333'

// const link = new HttpLink({
const link = createUploadLink({
  uri: `http://${api_domain}:${api_port}/graphql`,
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

export default client
