import PropTypes from 'prop-types'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_TAG } from '../graphql/mutation.js'

function CreateTagForm(props) {
  const { onCreated } = props
  const [newTagName, setNewTagName] = useState('')
  const [createTag] = useMutation(CREATE_TAG)

  function handleClick(name) {
    createTag({
      variables: {
        name: newTagName,
      },
      onCompleted: (d) => {
        onCreated()
      },
    })
    setNewTagName('')
  }

  return (
    <>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="tag"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
          />
        </div>
        <div className="control">
          <button
            className="button"
            disabled={newTagName === ''}
            onClick={() => handleClick(newTagName)}
          >
            Create
          </button>
        </div>
      </div>
    </>
  )
}

CreateTagForm.propTypes = {
  onCreated: PropTypes.func,
}

export default CreateTagForm
