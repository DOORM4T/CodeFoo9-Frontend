import React, { useState, useEffect } from 'react'

export default function Article(props) {
  // Set Article state to fetched data values
  const [images] = useState(props.data.thumbnails);
  const [commentCount, setCommentCount] = useState();
  const [title] = useState(props.data.metadata.headline ? props.data.metadata.headline : props.data.metadata.title);

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
      <p>Time: {Math.floor(Math.random() * 30) + 1}m</p>
      <p>Comments: {(commentCount > 0) ? commentCount : ''}</p>
      <h3>{title}</h3>
      <hr />
    </div>
  )
}
