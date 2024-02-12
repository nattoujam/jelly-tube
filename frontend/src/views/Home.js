/**
 * @file             : Home.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023/05/31
 * Last Modified Date: 2023 08/11
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import 'bulma/css/bulma.css'
import { useState } from 'react'
import PropTypes from 'prop-types'

// query
import { useQuery } from '@apollo/client'
import { GET_VIDEOS } from '../graphql/query.js'

// components
import Loading from '../components/Loading.js'
import { Movie } from '../components/Movie.js'

function MovieIcon(props) {
  // {{{
  const { id, title, thumnailURL, onClick } = props

  return (
    <div className="card">
      <div className="card-image">
        <img src={thumnailURL} width="100%" height="100%" alt={title} onClick={() => onClick(id)} />
      </div>
      <div className="card-content p-3 is-size-6">{title}</div>
    </div>
  )
  // }}}
}

MovieIcon.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  thumnailURL: PropTypes.string,
  onClick: PropTypes.func,
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
            <MovieIcon id={c.id} title={c.title} thumnailURL={c.thumnail.path} onClick={onClick} />
          </div>
        )
      })}
    </div>
  )
  // }}}
}
Gallery.propTypes = {
  contents: PropTypes.array,
  maxRowCount: PropTypes.number,
  onClick: PropTypes.func,
}

function Home() {
  // {{{
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [unselectedMovies, setUnselectedMovies] = useState(null)
  const { data, loading, error } = useQuery(GET_VIDEOS)

  if (loading) return <Loading />
  if (error) return <p>Error</p>

  function calcMaxRowCount() {
    // bulmaのcolumnで、何個まで横にならべるかきめるやつ
    // bulma has 12 units in 1 column.
    // 'column is-3' means 12/3 = arrange 4 units per 1 columns horizontally.
    if (selectedMovie != null) {
      return 12 // max 1
    } else {
      return 3 // max 4
    }
  }

  function handleClick(id) {
    setSelectedMovie(data.videos.find((v) => v.id === id))
    setUnselectedMovies(data.videos.filter((v) => v.id !== id))
  }

  console.log(data)

  return (
    <div className="section">
      <div className="columns is-vcenterd">
        {selectedMovie != null ? (
          <div className="column is-10">
            <div className="card">
              <Movie
                src={selectedMovie.videoFile.path}
                title={selectedMovie.title}
                tags={selectedMovie.tags.map((t) => t.name)}
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
              contents={selectedMovie === null ? data.videos : unselectedMovies}
              onClick={handleClick}
              maxRowCount={calcMaxRowCount()}
            />
          </div>
        </div>
      </div>
    </div>
  )
  // }}}
}

export default Home
