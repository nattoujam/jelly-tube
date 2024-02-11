/**
 * @file             : VideoTable.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/07
 * Last Modified Date: 2023 05/29
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import 'bulma/css/bulma.css'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useModal } from '../utils/modal'

// query
import { useQuery, useMutation } from '@apollo/client'
import { GET_VIDEOS } from '../graphql/query.js'
import { DELETE_VIDEO } from '../graphql/mutation.js'

// components
import Loading from './Loading.js'

function VideoRow(props) {
  const { id, title, name, tags, onDelete } = props

  function handleClick(e) {
    onDelete(id)
  }

  return (
    <tr>
      <th>{id}</th>
      <td>{title}</td>
      <td>{name}</td>
      <td>
        <div className="tags">
          {tags.map((tag) => (
            <span key={`${id}-${tag.id}`} className="tag">
              {tag.name}
            </span>
          ))}
        </div>
      </td>
      <td>
        <div className="buttons">
          <Link className="button is-small" to="/admin/edit">
            Edit
          </Link>
          <button className="button is-danger is-small" onClick={handleClick}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

VideoRow.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  name: PropTypes.string,
  tags: PropTypes.array,
  onDelete: PropTypes.function,
}

function VideoTable() {
  const { data, loading, error } = useQuery(GET_VIDEOS)
  const { ref, showModal, closeModal } = useModal()
  const [deletingId, setDeleteingId] = useState(null)
  const [mutate, { mutateLoading, mutateError }] = useMutation(DELETE_VIDEO, {
    variables: { id: deletingId },
    refetchQueries: [
      {
        query: GET_VIDEOS,
      },
    ],
  })

  function handleDeleting(id) {
    console.log('deleting', id)
    setDeleteingId(id)
    showModal()
  }

  function handleDelete() {
    console.log('delete', deletingId)
    mutate(deletingId)
    closeModal()
  }

  if (loading || mutateLoading) return <Loading />
  if (error || mutateError) return <p>Error</p>

  console.log(data)

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Name</th>
            <th>Tags</th>
            <th></th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Name</th>
            <th>Tags</th>
            <th></th>
          </tr>
        </tfoot>
        <tbody>
          {data.videos.map((c) => {
            let name = '-'
            if (c.videoFile !== null) {
              name = c.videoFile.name
            }
            return (
              <VideoRow
                key={c.id}
                id={c.id}
                title={c.title}
                name={name}
                tags={c.tags}
                onDelete={(id) => handleDeleting(id)}
              />
            )
          })}
        </tbody>
      </table>
      <dialog ref={ref}>
        Delete ?<br />
        <button type="button" onClick={handleDelete}>
          OK
        </button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </dialog>
    </>
  )
}

export default VideoTable
