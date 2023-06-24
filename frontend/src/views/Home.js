/**
 * @file             : Home.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023/05/31
 * Last Modified Date: 2023 06/10
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import 'bulma/css/bulma.css'
import { useState } from 'react'
import { api_domain, api_port } from '../const.js'

// query
import { useQuery } from '@apollo/client'
import { GET_VIDEOS } from '../graphql/query.js'

// components
import Loading from '../components/Loading.js'
import { Movie } from '../components/Movie.js'

function MovieIcon(props) {
  // {{{
  const { id, title, thumnailURL, playCount, onClick } = props

  return (
    <div className="card">
      <div className="card-image">
        <img
          src={thumnailURL}
          width="100%"
          height="100%"
          alt={title}
          onClick={() => onClick(id)}
        />
      </div>
      <div className="card-content p-3 is-size-6">{title}</div>
      <footer className="card-footer">
        <p className="card-footer-item is-size-7">{playCount}</p>
        <p className="card-footer-item is-size-7">hoge</p>
        <p className="card-footer-item is-size-7">fuga</p>
      </footer>
    </div>
  )
  // }}}
}

function Gallery(props) {
  // {{
  const { contents, maxRowCount, onClick } = props

  if (contents == null) {
    return <Loading />
  }

  return (
    <div className="columns is-vcenterd is-multiline">
      {contents.map((c) => {
        return (
          <div key={c.id} className={`column is-${maxRowCount}`}>
            <MovieIcon
              id={c.id}
              title={c.title}
              thumnailURL={c.thumnail.path}
              onClick={onClick}
            />
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

  function handleClick(id) {
    setSelectedMovie(data.videos.find((v) => v.id == id))
    setUnselectedMovies(data.videos.filter((v) => v.id != id))
  }

  return (
    <main className="section">
      <div className="columns is-vcenterd">
        {selectedMovieId != null ? (
          <div className="column is-10">
            <div className="card">
              <Movie
                src={data.videos.find((v) => v.id == selectedMovieId).videoFile.path}
                title={data.videos.find((v) => v.id == selectedMovieId).title}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div
          className="column"
          style={{
            maxHeight: '80vh',
            overflowY: 'scroll',
            overscrollBehavior: 'none',
          }}
        >
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
