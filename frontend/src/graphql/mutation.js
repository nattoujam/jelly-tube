/**
 * @file             : mutation.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/29
 * Last Modified Date: 2023 06/24
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import gql from 'graphql-tag'

export const CREATE_VIDEO = gql`
  mutation createVideo($title: String!, $movie: Upload!, $thumnail: Upload!, $tagIds: [Int!]!) {
    createVideo(input: { title: $title, movie: $movie, thumnail: $thumnail, tagIds: $tagIds }) {
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

export const CREATE_TAG = gql`
  mutation createTag($name: String!) {
    createTag(input: { name: $name }) {
      tag {
        id
      }
    }
  }
`
