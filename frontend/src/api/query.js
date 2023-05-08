/**
 * @file             : query.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/07
 * Last Modified Date: 2023 05/08
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const api_domain = 'jelly-fish.local';
const api_port = '3001';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `http://${api_domain}:${api_port}/graphql`
});

const client = new ApolloClient({
  cache,
  link
});

export async function fetchVideo(gqlQuery, params) {
  const response = await fetch(
    `http://${api_domain}:${api_port}/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: gqlQuery,
        variables: params
      })
    }
  );

  const data = await response.json();
  console.log(data.data);
  return data.data;
}

export function deleteVideo(id) {
}

export default fetchVideo;
export { api_domain, api_port };
