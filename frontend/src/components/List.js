/**
 * @file             : List.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/07
 * Last Modified Date: 2023 05/08
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import 'bulma/css/bulma.css';
import { useEffect, useState, useMemo, useRef } from 'react';

// query
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_VIDEOS, DELETE_VIDEO } from '../query.js';

import React, { Fragment } from 'react';

// components
import { Loading } from './Loading.js'

function VideoRow(props) {
  const { id, title, url } = props;
  const [mutate, { loading, error }] = useMutation(DELETE_VIDEO, {
    variables: { id: id },
    refetchQueries: [
      {
        query: GET_VIDEOS,
      },
    ]
  });

  if (loading) return <tr><th>Loading...</th></tr>;
  if (error) return <tr><th>Error</th></tr>;

  return (
    <tr>
      <th>{ id }</th>
      <td>{ title }</td>
      <td>{ url }</td>
      <td><button className='button'>Edit</button></td>
      <td><button className='button is-danger' onClick={ mutate }>Delete</button></td>
    </tr>
  );
}

function VideoTable() {
  const { data, loading, error } = useQuery(GET_VIDEOS);

  if (loading) return <Loading />;
  if (error) return <p>Error</p>;

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>URL</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>URL</th>
          <th></th>
          <th></th>
        </tr>
      </tfoot>
      <tbody>
        {
          data.videos.map(c => {
            return (
              <VideoRow key={ c.id } id={ c.id } title={ c.title } url={ c.url } />
            );
          })
        }
      </tbody>
    </table>
  );
}

export default VideoTable;
