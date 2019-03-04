import React, { useState, useEffect } from 'react'
import Moment from 'moment'

export default function Article(props) {
  // Set Article state to fetched data values
  const [images] = useState(props.data.thumbnails);
  const [commentCount, setCommentCount] = useState();
  const [metadata] = useState(props.data.metadata);

  useEffect(() => {
    // Get comment count using ID of article
    fetch(`https://cors-anywhere.herokuapp.com/https://ign-apis.herokuapp.com/comments?ids=${props.data.contentId}`)
      .then(res => res.json())
      .then(data => setCommentCount(data.content[0].count))
      .catch(err => { throw err })

  }, []);

  return (
    <div className="article">
      <img src={images[0].url} alt={metadata.slug} />
      <p>Published: {Moment(metadata.publishDate).fromNow()}</p>
      <p>Comments: {(commentCount > 0) ? commentCount : ''}</p>
      {/* Headline display. Object data names differ between Articles and Videos,
      so their respective properties must be chosen.*/}
      <h3>{metadata.headline ? metadata.headline : metadata.title}</h3>
      <p>{props.data.contentType}</p>
      <p>{Moment(metadata.publishDate).startOf('minute').fromNow()}</p>
      <hr />
    </div>
  )
}


