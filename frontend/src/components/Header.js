/**
 * @file             : Header.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/08
 * Last Modified Date: 2023 05/08
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import logo from '../logo.svg';
import '../App.css';
import 'bulma/css/bulma.css';
import { useState } from 'react';

function MyHeader(props) {
  const [ active, setActive ] = useState(false);

  function handleClick() {
    setActive(!active);
  }

  return (
    <header className="hero is-small is-dark is-bold">
      <div className="hero-body">
        <nav className='navbar' role='navigation' aria-label='main navigation'>
          <div className='navbar-brand'>
            <a className='navbar-item' href='/'>
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="title">Jelly-Tube</h1>
            </a> 
            <button role="button" className={`navbar-burger ${active ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="menu" onClick={handleClick}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div id='menu' className={`navbar-menu ${active ? 'is-active' : ''}`}>
            <div className='navbar-start'>
              <a href='/upload' className='navbar-item'>
                upload
              </a>
              <a href='/admin/video/list' className='navbar-item'>
                video list (admin)
              </a>
              <a href='/admin/tag/list' className='navbar-item'>
                tag list (admin)
              </a>
            </div>
            <div className='navbar-end'>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default MyHeader
