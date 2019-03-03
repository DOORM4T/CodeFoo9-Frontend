import React, { useState, useEffect } from 'react'
import Article from './Article'

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(5);

  useEffect(() => {
    console.log(feed)
  });

  useEffect(() => {
    fetch(`https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/content/?startIndex=${index}&count=${count}`)
      .then(res => res.json())
      .then(data => {
        setFeed(feed.concat(data.data));
      })
      .catch(err => { throw err })

  }, []);

  return (
    <ul>
      {
        feed.map((article, index) => (
          <li key={index}>
            <Article data={article} />
          </li>
        ))
      }
    </ul>
  )
}