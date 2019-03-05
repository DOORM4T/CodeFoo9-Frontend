import React from 'react'
import Feed from './Feed'
import './_layout.scss'

export default function Layout() {

  return (
    <>
      <div id="topbar">
        <h1 id="header">Latest News</h1>
        <hr id="top-hr" />
      </div>
      <Feed />
    </>
  )
}
