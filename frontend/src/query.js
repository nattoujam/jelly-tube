/**
 * @file             : query.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/08
 * Last Modified Date: 2023 05/08
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import gql from 'graphql-tag';

export const GET_VIDEOS = gql`
  query videoList {
    videos {
      id
      title
      url
    }
  }
`;

export const DELETE_VIDEO = gql`
  mutation deleteVideo($id: ID!) {
    deleteVideo (
      input: {
        id: $id
      }
    ) {
      id
    }
  }
`;
