/**
 * @file             : query.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/08
 * Last Modified Date: 2023 06/24
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
      tags {
        name
      }
    }
  }
`

export const GET_TAGS = gql`
  query tagList {
    tags {
      id
      name
      videos {
        title
      }
    }
  }
`
