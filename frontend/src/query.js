/**
 * @file             : query.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/08
 * Last Modified Date: 2023 05/29
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import gql from 'graphql-tag'

export const api_domain = 'jelly-fish.local'
// export const api_port = '3001';
export const api_port = '3333'

export const GET_VIDEOS = gql`
  query videoList {
    videos {
      id
      title
      videoFile {
        name
        path
      }
    }
  }
`
