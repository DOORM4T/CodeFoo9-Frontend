import React, { useState } from 'react'
import Feed from './Feed'

export default function Layout() {

  return (
    <div>
      <h1>Latest News</h1>
      <hr />

      <Feed />
    </div>
  )
}
