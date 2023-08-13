/**
 * @file             : AdminArea.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/10
 * Last Modified Date: 2023 05/12
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import { Link } from "react-router-dom";

// components
import AdminTabs from '../components/AdminTabs.js';
import VideoTable from '../components/VideoTable.js';

function UploadVideoButton() {
  return (
    <Link className='button' to='/admin/upload'>Upload Video</Link>
  );
}

function VideoList() {
  return (
    <main className='section'>
      <AdminTabs tab='videos'/>
      <h1 className='title'>Videos</h1>
      <VideoTable />
      <UploadVideoButton />
    </main>
  );
}

export default VideoList;