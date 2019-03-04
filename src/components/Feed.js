import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Article from './Article'
import 'font-awesome/css/font-awesome.min.css'
import './_feed.scss'

export default function Feed() {
  const [feed, setFeed] = useState([])
  const [index, setIndex] = useState(0)
  const [count] = useState(20)
  const [filter, setFilter] = useState('latest')

  const filterBy = (type) => {
    if (type === filter)
      return;

    // Add className to make feed fadeOut before fetching new content
    document.querySelectorAll('.feed-article').forEach(item => {
      item.classList.add('fade');
    });
    setTimeout(() => newState(type), 300);


    // Style active filter button
    document.querySelector('.active').classList.remove('active');
    document.querySelector(`.${type}`).classList.add('active');
  }

  const newState = (type) => {
    setFilter(type);
    setFeed([]);
    setIndex(0);
  }

  // FETCH ARTICLES FROM API
  const fetchArticles = () => {
    // Increment Start (Index) as page scrolls. Timeout is set to prevent loading errors.
    setTimeout(() => setIndex(index + count), 800)

    // Fetch data through CORS-anywhere as a proxy. 
    const url = 'https://cors-anywhere.herokuapp.com/ign-apis.herokuapp.com/content/'
    // console.log(`${url}?startIndex=${index}&count=${count}`)
    fetch(`${url}?startIndex=${index}&count=${count}`)
      .then(res => res.json())
      .then(data => {
        if (filter === 'latest')
          // Latest
          setFeed(feed.concat(data.data));
        else {
          // Filter by Article or Video
          setFeed(feed.concat(data.data.filter(data => data.contentType === filter)));
          // console.log(data.data.filter(data => data.contentType === filter))
        }
      })
      .catch(err => { throw err })
  }

  return (
    // Render Feed
    <div id="feed-container">
      <div id="nav">
        <button className="nav-btn latest active" onClick={() => filterBy('latest')}><i className="fa fa-clock-o" aria-hidden="true" /><label>Latest</label></button>
        <button className="nav-btn video" onClick={() => filterBy('video')}><i className="fa fa-play" aria-hidden="true" /> <label>Videos</label></button>
        <button className="nav-btn article" onClick={() => filterBy('article')}><i className="fa fa-file-alt" aria-hidden="true" /> <label>Articles</label></button>
      </div>

      <InfiniteScroll
        id="feed-content"
        initialLoad={true}
        hasMore={true}
        threshold={800}
        loadMore={fetchArticles}
      >
        {
          feed.map((item, i) => (
            <div className="feed-article" key={i}><Article data={item} /></div>
          ))
        }
      </InfiniteScroll >
    </div>

  )
}

