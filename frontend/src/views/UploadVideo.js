/**
 * @file             : UploadVideo.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/30
 * Last Modified Date: 2023 06/10
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// components
import Dropzone from '../components/Dropzone.js'
import Movie from '../components/Movie.js'

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

function ThumnailGenerator(props) {
  const file = props.file
  const w = 320
  const h = 180
  let max = 0
  const [context, setContext] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [thumnail, setThumnail] = useState(null)
  const [holdThumnail, setHoldThumnail] = useState(null)
  const onSelected = props.onSelected

  useEffect(() => {
    console.log('set context' + canvasRef.current)
    const canvasContext = canvasRef.current.getContext('2d')
    setContext(canvasContext)
  })

  function handleDurationChange() {
    max = Math.floor(videoRef.current.duration)
    console.log('max', max)
  }

  function handleSeek() {
    console.log('seeked')

    if (context !== null && file !== null) {
      context.drawImage(videoRef.current, 0, 0, w, h)
      context.canvas.toBlob(
        (b) => {
          setThumnail(b)
          if (holdThumnail === null) {
            setHoldThumnail(b)
            onSelected(b)
          }
        },
        'image/jpeg',
        0.75
      )
    }
  }

  function randomSeekVideo() {
    console.log(videoRef.current)
    if (file !== null) {
      const seek = Math.floor(Math.random() * (max - 1) + 1)
      console.log('seek to: ' + seek + ' max: ' + max)
      // videoRef.current.fastSeek(seek)
      videoRef.current.currentTime = seek
    }
  }

  function handleSelected() {
    setHoldThumnail(thumnail)
    onSelected(thumnail)
  }

  return (
    <>
      <video
        style={{ display: 'none' }}
        ref={videoRef}
        src={file === null ? '' : URL.createObjectURL(file)}
        onSeeked={handleSeek}
        onDurationChange={handleDurationChange}
      ></video>
      <canvas style={{ display: 'none' }} ref={canvasRef} width={w} height={h}></canvas>
      <div className="columns is-vcenterd">
        <div className="column is-6">
          <figure className="image">
            {thumnail === null ? (
              <></>
            ) : (
              <>
                <img src={URL.createObjectURL(thumnail)} />
                <figcaption className="label has-text-centerd">生成されたサムネイル</figcaption>
              </>
            )}
          </figure>
        </div>
        <div className="column is-6">
          <figure className="image">
            {holdThumnail === null ? (
              <></>
            ) : (
              <>
                <img style={{ border: 'solid cyan' }} src={URL.createObjectURL(holdThumnail)} />
                <figcaption className="label has-text-centerd">現在選択中のサムネイル</figcaption>
              </>
            )}
          </figure>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button" onClick={randomSeekVideo}>
            generate
          </button>
        </div>
        <div className="control">
          <button className="button" onClick={handleSelected}>
            select
          </button>
        </div>
      </div>
    </>
  )
}

function Preview() {
  return <></>
}

function UploadVideo() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [thumnailFile, setThumnailFile] = useState(null)
  const [status, setStatus] = useState('first')
  const navigate = useNavigate()
  const [mutate, { mutateLoading, mutateError }] = useMutation(CREATE_VIDEO, {
    variables: {
      title: title,
      movie: file,
      thumnail: thumnailFile,
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

  function handleSelected(thumnailBlob) {
    console.log('set thumnail')
    console.log(thumnailBlob)
    const name = file.name.replace(/^(.+)\..+$/, '$1') + '.jpg'
    const iFile = new File([thumnailBlob], name, { type: thumnailBlob.type })
    console.log(iFile)
    setThumnailFile(iFile)
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
              <label className="label">動画投稿欄</label>
              <Dropzone handleFile={handleFile} />
            </div>
            <div className="tile is-child">
              <label className="label">サムネイル選択</label>
              <div className="box">
                <ThumnailGenerator file={file} onSelected={handleSelected} />
              </div>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child box">
              <Preview />
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
