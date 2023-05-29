/**
 * @file             : mutation.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/29
 * Last Modified Date: 2023 05/29
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import gql from 'graphql-tag'

export const CREATE_VIDEO = gql`
  mutation createVideo($title: String!, $movie: Upload!) {
    createVideo(input: { title: $title, movie: $movie }) {
      video {
        title
      }
    }
  }
`

export const DELETE_VIDEO = gql`
  mutation deleteVideo($id: ID!) {
    deleteVideo(input: { id: $id }) {
      id
    }
  }
`
