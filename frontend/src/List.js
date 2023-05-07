/**
 * @file             : List.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/07
 * Last Modified Date: 2023 05/07
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import 'bulma/css/bulma.css';
import { useEffect, useState, useMemo, useRef } from 'react';
import { fetchVideo } from './query.js';

const query = `
  query All {
    videos {
      id
      title
      url
    }
  }
`;

function Loading(props) {
  const { nullable, loadedComponent } = props;

  return (
    <div>
      {
        (nullable === null) ? (
          <p>Loading</p>
        ) : (
          { loadedComponent }
        )
      }
    </div>
  );
}

function VideoRow(props) {
  const { id, title, url } = props;

  return (
    <tr>
      <th>{ id }</th>
      <td>{ title }</td>
      <td>{ url }</td>
    </tr>
  );
}

function VideoTable() {
  const [contents, setContents] = useState(null);

  useEffect(() => {
    fetchVideo(query).then((contents) => {
      setContents(contents.videos);
    });
  }, []);

  function mapRows() {
    return (
      contents.map(c => {
        return (
          <div key={`${c.id}`}>
            <VideoRow id={`${c.id}`} title={`${c.title}`} url={`${c.url}`} />
          </div>
        );
      })
    );
  }


  return (
    <table className='table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>URL</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>URL</th>
        </tr>
      </tfoot>
      <tbody>
        {
          (contents === null) ? (
            <tr></tr>
          ) : (
            contents.map(c => {
              return (
                <VideoRow key={ c.id } id={ c.id } title={ c.title } url={ c.url } />
              );
            })
          )
        }
      </tbody>
    </table>
  );
}

export default VideoTable;
