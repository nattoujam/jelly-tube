import { Link } from "react-router-dom";
import { useState } from 'react'
import { useModal } from '../utils/modal'

// graphql
import { useQuery, useMutation } from '@apollo/client'
import { GET_TAGS } from '../graphql/query.js'
import { DELETE_TAG } from '../graphql/mutation.js'

// components
import Loading from '../components/Loading.js'
import AdminTabs from '../components/AdminTabs.js'
import CreateTagForm from '../components/CreateTagForm.js'

function TagTable() {
  const { data, loading, error, refetch } = useQuery(GET_TAGS)
  const { ref, showModal, closeModal } = useModal()
  const [deletingId, setDeleteingId] = useState(null)
  const [mutate, { mutateLoading, mutateError }] = useMutation(DELETE_TAG, {
    variables: { id: deletingId },
    refetchQueries: [
      {
        query: GET_TAGS,
      },
    ],
  })

  function handleDeleting(id) {
    setDeleteingId(id)
    showModal()
  }

  function handleDelete() {
    mutate(deletingId)
    closeModal()
  }

  function handleCreated() {
    refetch()
  }

  if (loading || mutateLoading) return <Loading />
  if (error || mutateError) return <p>Error</p>

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th># of videos</th>
            <th></th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Name</th>
            <th># of videos</th>
            <th></th>
          </tr>
        </tfoot>
        <tbody>
          {data.tags.map((tag) => {
            return (
              <TagRow
                key={tag.id}
                id={tag.id}
                name={tag.name}
                count={tag.videos.length}
                onDelete={(id) => handleDeleting(id)}
              />
            )
          })}
        </tbody>
      </table>
      <CreateTagForm onCreated={handleCreated}/>
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

function TagRow(props) {
  const { id, name, count, onDelete } = props

  function handleClick(e) {
    onDelete(id)
  }

  return (
    <tr>
      <td><span className='tag'>{name}</span></td>
      <td>{count}</td>
      <td>
        <div className='buttons'>
          <button className="button is-danger is-small" onClick={handleClick}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}


function TagList() {
  return (
    <main className='section'>
      <AdminTabs tab='tags'/>
      <h1 className='title'>Tag List</h1>
      <TagTable />
    </main>
  );
}

export default TagList;
