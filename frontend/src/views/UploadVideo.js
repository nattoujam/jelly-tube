/**
 * @file             : UploadVideo.js
 * @author           : nattoujam <public.kyuuanago@gmail.com>
 * Date              : 2023 05/12
 * Last Modified Date: 2023 05/12
 * Last Modified By  : nattoujam <public.kyuuanago@gmail.com>
 */

import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

// query
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_VIDEOS, CREATE_VIDEO } from '../query.js';

function UploadVideo() {
  const [ title, setTitle ] = useState('');
  const [ url, setUrl ] = useState('hogehoge'); // TODO: default = ''
  const [ success, setSuccess ] = useState(false);
  const navigate = useNavigate();
  const [mutate, { mutateLoading, mutateError }] = useMutation(CREATE_VIDEO, {
    variables: {
      title: title,
      url: url
    },
    onCompleted: () => setSuccess(true),
  });

  function handleSubmit() {
    mutate()
  }

  if (mutateLoading) return <Loading />;
  if (mutateError) return <p>Error</p>;

  return (
    <>
      <div className='section'>
        <h1 className='title'>Upload Video</h1>
        <div className='field'>
          <label className='label'>Title</label>
          <div className='control'>
            <input className='input' type='text' placeholder='title' value={ title } onChange={ e => setTitle(e.target.value) }/>
          </div>
        </div>
        <div className="file has-name is-right">
          <label className="file-label">
            <input className="file-input" type="file" name="resume" onChange={ e => setUrl(e.target.value) }/>
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">
                Choose a file…
              </span>
            </span>
            <span className="file-name">
              { url }
            </span>
          </label>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={ handleSubmit }>Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light" onClick={ () => navigate(-1) }>Cancel</button>
          </div>
        </div>
      </div>
      { success ? (
        <section className="hero is-success is-small">
          <div className="hero-body">
            <p className="title">
              Upload Success
            </p>
            <p className='subtitle'>
              title = { title }
            </p>
          </div>
        </section>
      ) : <div /> }
    </>
  );
}

export default UploadVideo;
