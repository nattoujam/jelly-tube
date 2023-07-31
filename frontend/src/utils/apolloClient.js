/**
 * @file             : apolloClient.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/29
 * Last Modified Date: 2023 07/20
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { api_domain, api_port } from '../const.js'

const link = createUploadLink({
  // uri: `https://${api_domain}/graphql`,
  uri: `http://jelly-fish.local:3333$/graphql`,
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

export default client
