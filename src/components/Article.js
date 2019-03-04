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
      {/* Thumbnail //TODO: Responsive Thumbnail Sizes */}
      <img src={images[0].url} alt={metadata.slug} />
      {/* Time since publication date */}
      <p>Published: {sincePublication(metadata.publishDate)}</p>
      <p>Comments: {(commentCount > 0) ? commentCount : ''}</p>
      {/* Headline display. Object data names differ between Articles and Videos,
      so their respective properties must be chosen.*/}
      <h3>{metadata.headline ? metadata.headline : metadata.title}</h3>
      <p> {metadata.duration ? `Duration: ${Moment(metadata.duration).format('h:mm')}` : ''} </p>
      <p>{props.data.contentType}</p>
      <hr />
    </div>
  )
}

const sincePublication = (date) => {
  let pubDate = Moment.utc(date),
    now = Moment.utc(),

    diff = now.diff(pubDate, 'years');
  if (diff !== 0)
    return (diff + 'y');
  diff = now.diff(pubDate, 'months');
  if (diff !== 0)
    return (diff + 'mo');
  diff = now.diff(pubDate, 'days');
  if (diff !== 0)
    return (diff + 'd');
  diff = now.diff(pubDate, 'hours');
  if (diff !== 0)
    return (diff + 'h');
  diff = now.diff(pubDate, 'minutes');
  if (diff !== 0)
    return (diff + 'm');
  diff = now.diff(pubDate, 'seconds');
  if (diff !== 0)
    return (diff + ' s');
  diff = now.diff(pubDate, 'hours');
}

