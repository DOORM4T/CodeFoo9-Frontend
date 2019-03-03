import React, { useState, useEffect } from 'react'

export default function Article(props) {
  // Set Article state to fetched data values
  const [images, setImages] = useState(props.data.thumbnails);
  const [readTime, setReadTime] = useState();
  const [commentCount, setCommentCount] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    // Get comment count using ID of article
    fetch(`https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/comments?ids=${props.data.contentId}`)
      .then(res => res.json())
      .then(data => setCommentCount(data.content[0].count))
      .catch(err => { throw err })

  }, []);

  return (
    <div className="article">
      <img src={images[0].url} />
      <label>{commentCount}</label>
    </div>
  )
}
