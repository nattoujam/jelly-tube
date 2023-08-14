/**
 * @file             : App.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 04/16
 * Last Modified Date: 2023 05/10
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

// import './App.css';
import 'bulma/css/bulma.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import MyHeader from './components/Header.js'

// views
import Home from './views/Home.js'
import VideoList from './views/VideoList.js'
import TagList from './views/TagList.js'
import UploadVideo from './views/UploadVideo.js'

function App() {
  // {{{
  return (
    <BrowserRouter>
      <main className="App">
        <MyHeader />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/upload" element={<UploadVideo />} />
          <Route path="/admin/video/list" element={<VideoList />} />
          <Route path="/admin/tag/list" element={<TagList />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
  // }}}
}

export default App
