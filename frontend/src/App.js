/**
 * @file             : App.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 04/16
 * Last Modified Date: 2023 05/10
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

// import './App.css';
import 'bulma/css/bulma.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import MyHeader from './components/Header.js';

// views
import AdminArea from './views/AdminArea.js';
import Home from './views/Home.js';
import UploadVideo from './views/UploadVideo.js';

function App() {
  // {{{
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader />
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          <Route path='/admin' element={ <AdminArea /> } />
          <Route path='/admin/upload' element={ <UploadVideo /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
  // }}}
}

export default App;
