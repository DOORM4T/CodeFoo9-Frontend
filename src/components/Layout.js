import React from 'react'
import Feed from './Feed'
import './_layout.scss'

export default function Layout() {

  return (
    <div id="outer">
      <div id="layout">
        <h1 id="header">Latest News</h1>
        <hr id="top-hr" />

        <Feed />
      </div>
    </div>
  )
}
