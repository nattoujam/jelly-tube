function AdminTabs(props) {
  const { tab } = props

  return (
    <div className='tabs is-centerd'>
      <ul>
        <li className={tab === 'videos' ? 'is-active' : ''}>
          <a href='/admin/video/list'>Videos</a>
        </li>
        <li className={tab === 'tags' ? 'is-active' : ''}>
          <a href='/admin/tag/list'>Tags</a>
        </li>
      </ul>
    </div>
  )
}

export default AdminTabs
