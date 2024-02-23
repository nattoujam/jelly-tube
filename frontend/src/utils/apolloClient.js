/**
 * @file             : apolloClient.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/29
 * Last Modified Date: 2023 08/11
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import { ApolloClient, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

const link = createUploadLink({
  uri: `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/graphql`,
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

export default client
