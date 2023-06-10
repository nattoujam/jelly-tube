/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Movie.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: nattoujam <Public.kyuuanago@gmail.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/06/05 00:34:21 by nattoujam         #+#    #+#             */
/*   Updated: 2023/06/05 00:36:33 by nattoujam        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { useEffect, useMemo, useRef } from 'react'
import Hls from 'hls.js'

const movieStyle = {
  maxHeight: '70vh',
}

export function Movie(props) {
  console.log('url=' + props.src)

  return (
    <>
      <div className="card has-text-centered">
        <div className="card-image has-background-black">
          {props.src.match(/\.m3u8$/) ? <HLSMovie {...props} /> : <OtherMovie {...props} />}
        </div>
      </div>
      <div className="is-size-3 card-content">{props.title}</div>
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
