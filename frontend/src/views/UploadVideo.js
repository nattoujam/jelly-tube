/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UploadVideo.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: nattoujam <Public.kyuuanago@gmail.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/05/30 21:49:11 by nattoujam         #+#    #+#             */
/*   Updated: 2023/05/30 22:15:50 by nattoujam        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// components
import Dropzone from '../components/Dropzone.js'

// query
import { useMutation } from '@apollo/client'
import { CREATE_VIDEO } from '../graphql/mutation.js'

function Banner(props) {
  if (props.status === 'success') {
    return (
      <section className="hero is-success is-small">
        <div className="hero-body">
          <p className="title">Upload Success</p>
        </div>
      </section>
    )
  } else if (props.status === 'uploading') {
    return (
      <footer className="hero is-warning is-small">
        <div className="hero-body">
          <p className="title">Uploading...</p>
          <p className="subtitle">title = {props.title}</p>
        </div>
      </footer>
    )
  } else {
    return <></>
  }
}

function UploadVideo() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('first')
  const navigate = useNavigate()
  const [mutate, { mutateLoading, mutateError }] = useMutation(CREATE_VIDEO, {
    variables: {
      title: title,
      movie: file,
    },
    onCompleted: () => {
      setStatus('success')
    },
  })

  function handleFile(file) {
    console.log('upload')
    console.log(file)
    setFile(file)
  }

  function handleSubmit() {
    console.log('submit')
    setStatus('uploading')
    mutate()
  }

  if (mutateLoading) return <Loading />
  if (mutateError) return <p>Error</p>

  return (
    <>
      <div className="section">
        <h1 className="title">Upload Video</h1>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical is-8">
            <div className="tile is-child">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="tile is-child">
              <label className="label">広告欄</label>
              <div className="control">
                <input className="input" type="text" placeholder="広告募集中" />
              </div>
            </div>
            <div className="tile is-child">
              <Dropzone handleFile={handleFile} />
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child box">
              <p>広告募集中</p>
            </div>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link"
              onClick={handleSubmit}
              disabled={status === 'uploading'}
            >
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>
        <Banner status={status} title={title} />
      </div>
    </>
  )
}

export default UploadVideo
