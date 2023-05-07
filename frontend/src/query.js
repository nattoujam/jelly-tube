/**
 * @file             : query.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/07
 * Last Modified Date: 2023 05/07
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

const api_domain = 'jelly-fish.local';
const api_port = '3001';

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

export default fetchVideo;
export { api_domain, api_port };
