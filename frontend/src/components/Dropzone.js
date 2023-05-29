/**
 * @file             : Dropzone.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/29
 * Last Modified Date: 2023 05/29
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import React, { useMemo, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

function Dropzone(props) {
  // onDrop returns a function that will return our file.
  const onDrop = useCallback((files) => {
    props.handleFile(files[0])
  })

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    open,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { 'video/*': ['.mp4'] },
    onDrop,
    maxFiles: 1,
  })

  const files = acceptedFiles.map((file) => (
    <p key={file.path}>
      {file.path} – {file.size} bytes
    </p>
  ))

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <>
      <section className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop a file here, or click to select a file</p>
        </div>
        <aside>{files}</aside>
      </section>
    </>
  )
}

export default Dropzone
