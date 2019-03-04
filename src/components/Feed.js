import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Article from './Article'

export default function Feed(props) {
  const [feed, setFeed] = useState([])
  const [index, setIndex] = useState(0)
  const [count] = useState(20)

  // FETCH ARTICLES FROM API
  const fetchArticles = () => {
    // Increment Start (Index) as page scrolls.
    // Timeout is set to prevent loading errors.
    setTimeout(() => setIndex(index + count), 1000)

    // Fetch Data Through CORS-anywhere as a proxy. 
    const url = 'https://cors-anywhere.herokuapp.com/ign-apis.herokuapp.com/content/'
    // console.log(`${url}?startIndex=${index}&count=${count}`)
    fetch(`${url}?startIndex=${index}&count=${count}`)
      .then(res => res.json())
      .then(data => {
        if (props.filter === 'latest')
          // Latest
          setFeed(feed.concat(data.data));
        else {
          // Filter by Article or Video
          setFeed(feed.concat(data.data.filter(data => data.contentType === props.filter)));
          // console.log(data.data.filter(data => data.contentType === props.filter))
        }
      })
      .catch(err => { throw err })
  }

  return (
    // Render Feed
    <InfiniteScroll
      initialLoad={true}
      hasMore={true}
      threshold={800}
      useCapture={false}
      // loader={<h4 key={0}>Loading...</h4>}
      loadMore={fetchArticles}
    >
      {
        feed.map((item, i) => (
          <li key={i}><Article data={item} /></li>
        ))
      }
    </InfiniteScroll >

  )
}

