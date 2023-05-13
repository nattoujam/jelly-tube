/**
 * @file             : VideoTable.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/07
 * Last Modified Date: 2023 05/12
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import 'bulma/css/bulma.css';
import { useState, useCallback, useRef } from 'react';
import { Link } from "react-router-dom";

// query
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_VIDEOS, DELETE_VIDEO } from '../query.js';

import React, { Fragment } from 'react';

// components
import Loading from './Loading.js'

function useModal() {
  const ref = useRef(null); 

  const showModal = useCallback(() => {
    console.log('open');
    if (ref.current !== null) {
      ref.current.showModal();
    }
  }, []);

  const closeModal = useCallback(() => {
    console.log('close');
    if (ref.current !== null) {
      ref.current.close();
    }
  }, []);

  return { ref, showModal, closeModal };
}

function Dialog() {
  const { message, onOk, onCancel } = props;

  return (
    <dialog ref={ ref }>
      { message }<br/>
      <button type='button' onClick={ onOk }>
        OK
      </button>
      <button type='button' onClick={ onCancel }>
        Cancel
      </button>
    </dialog>
  );
}

function VideoRow(props) {
  const { id, title, url, onDelete } = props;

  function handleClick(e) {
    onDelete(id);
  }

  return (
    <tr>
      <th>{ id }</th>
      <td>{ title }</td>
      <td>{ url }</td>
      <td><Link className='button' to='/admin/edit'>Edit</Link></td>
      <td><button className='button is-danger' onClick={ handleClick }>Delete</button></td>
    </tr>
  );
}

function VideoTable() {
  const { data, loading, error } = useQuery(GET_VIDEOS);
  const { ref, showModal, closeModal } = useModal();
  const [ deletingId, setDeleteingId ] = useState(null);
  const [mutate, { mutateLoading, mutateError }] = useMutation(DELETE_VIDEO, {
    variables: { id: deletingId },
    refetchQueries: [
      {
        query: GET_VIDEOS,
      },
    ]
  });

  function handleDeleting(id) {
    console.log('deleting', id)
    setDeleteingId(id);
    showModal();
  }

  function handleDelete() {
    console.log('delete', deletingId)
    mutate(deletingId);
    closeModal();
  }

  if (loading || mutateLoading) return <Loading />;
  if (error || mutateError) return <p>Error</p>;

  return (
    <>
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
                <VideoRow key={ c.id } id={ c.id } title={ c.title } url={ c.url } onDelete={ (id) => handleDeleting(id) } />
              );
            })
          }
        </tbody>
      </table>
      <dialog ref={ ref }>
        Delete ?<br/>
        <button type='button' onClick={ handleDelete }>
          OK
        </button>
        <button type='button' onClick={ closeModal }>
          Cancel
        </button>
      </dialog>
    </>
  );
}

export default VideoTable;
