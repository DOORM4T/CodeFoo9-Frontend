import React, { useState } from 'react'
import Feed from './Feed'

export default function Layout() {
  const [filter, setFilter] = useState('latest')

  const filterBy = (type) => {
    setFilter(type);
  }

  return (
    <div>
      <h1>Latest News</h1>
      <hr />
      <div id="nav">
        <button onClick={() => filterBy('latest')}>Latest</button>
        <button onClick={() => filterBy('videos')}>Videos</button>
        <button onClick={() => filterBy('articles')}>Articles</button>
      </div>
      <Feed />
    </div>
  )
}
