/**
 * @file             : Home.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/10
 * Last Modified Date: 2023 05/29
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import 'bulma/css/bulma.css'
import { useEffect, useState, useMemo, useRef } from 'react'
import Hls from 'hls.js'
import { api_domain, api_port } from '../const.js'

// query
import { useQuery } from '@apollo/client'
import { GET_VIDEOS } from '../graphql/query.js'

// components
import Loading from '../components/Loading.js'

function Movie(props) {
  const { src } = props
  console.log('url=' + src)

  if (src.match(/\.m3u8$/)) {
    return <HLSMovie {...props} />
  } else {
    return <OtherMovie {...props} />
  }
}

function OtherMovie(props) {
  const { src } = props
  const { title } = props

  function handlePlayMovie() {
    console.log('play')
  }

  return (
    <div className="card">
      <div className="card-image">
        <div className="card">
          <video src={src} controls onPlay={handlePlayMovie}></video>
          <p>{title}</p>
        </div>
      </div>
    </div>
  )
}

function HLSMovie(props) {
  // {{{
  const { src } = props
  const { title } = props

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
    <div className="card">
      <div className="card-image">
        <div className="card">
          {isSupportBrowser ? (
            <video ref={videoRef} controls onPlay={handlePlayMovie}></video>
          ) : (
            <p>Not Support Browser.</p>
          )}
          <p>{title}</p>
        </div>
      </div>
    </div>
  )
  // }}}
}

function MovieIcon(props) {
  // {{{
  const { id } = props
  const { title } = props
  const { playCount } = props
  const { onClick } = props

  return (
    <div className="card">
      <div className="card-image">
        <div className="card">
          <img
            src={`http://${api_domain}:${api_port}/thumnail.png`}
            width="100%"
            height="100%"
            alt={`${title}`}
            onClick={() => onClick(id)}
          />
          <p>{title}</p>
          <p>{playCount}</p>
        </div>
      </div>
    </div>
  )
  // }}}
}

function Gallery(props) {
  // {{{
  const { contents } = props
  const { onClick } = props
  const { maxRowCount } = props
  let dev = 0

  if (contents == null) {
    return <Loading />
  }

  return (
    <div className="columns is-vcenterd is-multiline">
      {contents.map((c) => {
        dev += 1
        return (
          <div key={`${dev}${c.id}`} className={`column is-${maxRowCount}`}>
            <MovieIcon id={`${c.id}`} title={`${c.title}`} onClick={onClick} />
          </div>
        )
      })}
    </div>
  )
  // }}}
}

function Home() {
  // {{{
  const [selectedMovieId, setSelectedMovieId] = useState(null)

  const { data, loading, error } = useQuery(GET_VIDEOS)

  if (loading) return <Loading />
  if (error) return <p>Error</p>

  function calcMaxRowCount() {
    // bulmaのcolumnで、何個まで横にならべるかきめるやつ
    // bulma has 12 units in 1 column.
    // 'column is-3' means 12/3 = arrange 4 units per 1 columns horizontally.
    if (selectedMovieId != null) {
      return 12 // max 1
    } else {
      return 3 // max 4
    }
  }

  function getUnselectedMovies() {
    return data.videos.filter((v) => v.id != selectedMovieId)
  }

  function handleClick(id) {
    console.log(`click ${id}`)
    setSelectedMovieId(id)
  }

  return (
    <main className="section">
      <div className="columns is-vcenterd is-multiline">
        {selectedMovieId != null ? (
          <div className="column is-8">
            <Movie
              src={data.videos.find((v) => v.id == selectedMovieId).videoFile.path}
              title={data.videos.find((v) => v.id == selectedMovieId).title}
            />
          </div>
        ) : (
          <div></div>
        )}
        <div className="column scroll">
          <div className="container">
            <Gallery
              contents={getUnselectedMovies()}
              onClick={handleClick}
              maxRowCount={calcMaxRowCount()}
            />
          </div>
        </div>
      </div>
    </main>
  )
  // }}}
}

export default Home