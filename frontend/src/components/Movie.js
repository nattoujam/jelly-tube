/**
 * @file             : Movie.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 06/05
 * Last Modified Date: 2023 06/24
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import { useEffect, useMemo, useRef } from 'react'
import Hls from 'hls.js'

const movieStyle = {
  maxHeight: '70vh',
}

export function Movie(props) {
  console.log('url=' + props.src)
  const tags = props.tags

  return (
    <>
      <div className="card">
        <div className="card-image has-text-centered has-background-black">
          {props.src.match(/\.m3u8$/) ? <HLSMovie {...props} /> : <OtherMovie {...props} />}
        </div>
        <div className="is-size-3 card-content">{props.title}</div>
        <footer className="card-footer">
          {tags
            .sort((t1, t2) => t1 > t2)
            .map((t, i) => {
              return (
                <div key={i} className="card-footer-item">
                  {t}
                </div>
              )
            })}
        </footer>
      </div>
    </>
  )
}

export function OtherMovie(props) {
  const { src } = props

  function handlePlayMovie() {
    console.log('play')
  }

  return (
    <>
      <video style={movieStyle} src={src} controls onPlay={handlePlayMovie}></video>
    </>
  )
}

export function HLSMovie(props) {
  // {{{
  const { src } = props

  function handlePlayMovie() {
    console.log('play')
  }

  const isSupportBrowser = useMemo(() => Hls.isSupported(), [])
  const videoRef = useRef(null)
  useEffect(() => {
    if (isSupportBrowser) {
      var hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(videoRef.current)
      return () => {
        hls.removeAllListeners()
        hls.stopLoad()
      }
    }
  }, [src])

  return (
    <>
      {isSupportBrowser ? (
        <video style={movieStyle} ref={videoRef} controls onPlay={handlePlayMovie}></video>
      ) : (
        <p>Not Support Browser.</p>
      )}
    </>
  )
  // }}}
}
