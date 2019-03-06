import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Article from './Article'

{/* Infinite scroll div -- loads content as user scrolls */ }
export default function Scroller(props) {
  return (
    <InfiniteScroll
      id="feed-content"
      hasMore={true}
      threshold={500}
      loadMore={() => props.fetchArticles}
      initialLoad={true}
    >
      {
        props.feed.map((item, i) => (
          <div className="feed-article" id={`article-${i}`} key={i}><Article data={item} /></div>
        ))
      }
    </InfiniteScroll >
  )
}
