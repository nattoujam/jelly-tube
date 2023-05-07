/**
 * @file             : App.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 04/16
 * Last Modified Date: 2023 05/07
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css';
import { useEffect, useState, useMemo, useRef } from 'react';
import Hls from 'hls.js';
import VideoTable from './List.js';
import { fetchVideo, api_domain, api_port } from './query.js';

function Header() {
  // {{{
  return (
    <header className="hero is-small is-dark is-bold">
      <div className="hero-body">
        <nav className='navbar' role='navigation' aria-label='main navigation'>
          <div className='navbar-brand'>
            <a className='navbar-item' href='https://jelly-fish.local:3000/'>
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="title">Jelly-Tube</h1>
            </a> 
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="menu">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id='menu' className='navbar-menu'>
            <div className='navbar-start'>
              <a className='navbar-item'>
                upload
              </a>
            </div>
            <div className='navbar-end'>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
  // }}}
}

function Movie(props) {
  // {{{
  const { src } = props;
  const { name } = props;

  console.log('url='+src)

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
            <video
              ref={videoRef}
              controls
              onPlay={handlePlayMovie}
            ></video>
          ) : (
            <p>
              Not Support Browser.
            </p>
          )}
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
  // }}}
}

function MovieIcon(props) {
  // {{{
  const { id } = props;
  const { name } = props;
  const { playCount } = props;
  const { onClick } = props;

  return (
    <div className="card">
      <div className="card-image">
        <div className="card">
          <img
            src={`https://${api_domain}:${api_port}/thumnail.png`}
            width='100%'
            height='100%'
            alt={`${name}`}
            onClick={() => onClick(id)}
          />
          <p>{name}</p>
          <p>{playCount}</p>
        </div>
      </div>
    </div>
  );
  // }}}
}

function Loading() {
  // {{{
  return <p>Loading...</p>
  // }}}
}

function Gallery(props) {
  // {{{
  const { contents } = props;
  const { onClick } = props;
  const { maxRowCount } = props;
  let dev = 0;
  
  if (contents == null) {
    return <Loading />;
  }

  return (
    <div className="columns is-vcenterd is-multiline">
      {contents.map(c => {
        dev += 1;
        return (
          <div key={`${dev}${c.id}`} className={`column is-${maxRowCount}`}>
            <MovieIcon id={`${c.id}`} name={`${c.title}`} onClick={onClick} />
          </div>
        );
      })}
    </div>
  );
  // }}}
}

function Main() {
  // {{{
  const [contentsOrg, setContentsOrg] = useState(null);
  const [contents, setContents] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const query = `
    query All {
      videos {
        id
        title
        url
      }
    }
  `;

  useEffect(() => {
    fetchVideo(query).then((contents) => {
      setContents(contents.videos);
      setContentsOrg(contents.videos);
    });
  }, []);

  function calcMaxRowCount() {
    // bulmaのcolumnで、何個まで横にならべるかきめるやつ
    // bulma has 12 units in 1 column.
    // 'column is-3' means 12/3 = arrange 4 units per 1 columns horizontally. 
    if (selectedMovie != null) {
      return 12 // max 1
    }
    else {
      return 3 // max 4
    }
  }
  
  function handleClick(id) {
    console.log(`click ${id}`);
    setSelectedMovie(id);
    setContents(contentsOrg.filter(v => v.id != id));
  }

  return (
    <main className='section'>
      <div className='columns is-vcenterd is-multiline'>
        {
          (selectedMovie != null) ? (
            <div className='column is-8'>
              <Movie
                src={`${contentsOrg.find(v => v.id == selectedMovie).url}`}
                name={`${selectedMovie}`}
              />
            </div>
          ) : (<div></div>)
        }
        <div className='column scroll'>
          <div className='container'>
            <Gallery contents={contents} onClick={handleClick} maxRowCount={calcMaxRowCount()}/>
          </div>
        </div>
      </div>
    </main>
  );
  // }}}
}

function App() {
  // {{{
  return (
    <div className="App">
      <Header />
      <Main />
      <VideoTable />
    </div>
  );
  // }}}
}

export default App;
