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
    setTimeout(() => newState(type), 100);


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
    if (index > 300) { // There seems to be around 300 unique articles from the provided API.
      console.log("End of Unique Articles from API...");
    }
    // Increment Start (Index) as page scrolls. Timeout is set to prevent loading errors.
    setTimeout(() => setIndex(index + count), 1000)

    // Fetch data through CORS-anywhere as a proxy. 
    const url = 'https://cors-anywhere.herokuapp.com/ign-apis.herokuapp.com/content/'
    // console.log(`${url}?startIndex=${index}&count=${count}`)
    fetch(`${url}?startIndex=${index}&count=${count}`)
      .then(res => res.json())
      .then(data => {
        if (filter === 'latest')
          // Latest
          // Data is used to create a set, which purges duplicate items. 
          // Spread operator used to turn Set back into array.
          setFeed([...new Set(feed.concat(data.data))]);
        else {
          // Filter by Article or Video
          setFeed([...new Set(feed.concat(data.data.filter(data => data.contentType === filter)))]);
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

      {/* Infinite scroll div -- loads content as user scrolls */}
      <InfiniteScroll
        id="feed-content"
        hasMore={true}
        threshold={500}
        loadMore={fetchArticles}
        initialLoad={true}
      >
        {
          feed.map((item, i) => (
            <div className="feed-article" id={`article-${i}`} key={i}><Article data={item} /></div>
          ))
        }
      </InfiniteScroll >
    </div>

  )
}

