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
import { Link } from "react-router-dom";

function MyHeader(props) {
  const { onClick } = props

  return (
    <header className="hero is-small is-dark is-bold">
      <div className="hero-body">
        <nav className='navbar' role='navigation' aria-label='main navigation'>
          <div className='navbar-brand'>
            <a className='navbar-item' href='/'>
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
              <a href='/upload' className='navbar-item'>
                upload
              </a>
              <a href='/admin' className='navbar-item'>
                admin area
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
