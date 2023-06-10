/**
 * @file             : query.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/08
 * Last Modified Date: 2023 06/10
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import gql from 'graphql-tag'

export const GET_VIDEOS = gql`
  query videoList {
    videos {
      id
      title
      videoFile {
        name
        path
      }
      thumnail {
        path
      }
    }
  }
`
