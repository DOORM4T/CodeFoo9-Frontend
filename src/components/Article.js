import React, { useState, useEffect } from 'react'
import Moment from 'moment'
import 'font-awesome/css/font-awesome.min.css'
import './_article.scss'


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
    // Fetched content
    <>
      <div id="article">
        {/* Image */}
        <img src={images[0].url ? images[0].url : ''} alt={metadata.slug} />
        {/* Video Information */}
        <p> {metadata.duration ? `${convertDuration(metadata.duration)}` : ''} </p>
        <i className="fas fa-play-circle"></i>
        <div id="info">
          {/* Time since publication date */}
          <label>{sincePublication(metadata.publishDate)}</label>
          <label>
            {(commentCount > 0) ? (
              <React.Fragment>
                <span> - </span>
                < i className="far fa-comment" />
                {commentCount}
              </React.Fragment>
            ) : ''}
          </label>
          {/* Headline display. Object data names differ between Articles and Videos,
        so their respective properties must be chosen.*/}
          <h3>{metadata.headline ? metadata.headline : metadata.title}</h3>
        </div>
      </div>
      <hr />
    </>
  )
}

// Time since article was published
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
}

// Convert video duration from minutes to format of hh:mm:ss
const convertDuration = (duration) => {
  let hours = Math.trunc(duration / 3600)
  let minutes = Math.trunc((duration - hours) / 60)
  let seconds = duration - minutes * 60
  if (hours < 10)
    hours = '0' + hours;
  if (minutes < 10)
    minutes = '0' + minutes;
  if (seconds < 10)
    seconds = '0' + seconds;
  return `${(hours + '').substring(0, 2)}:${(minutes + '').substring(0, 2)}:${(seconds + '').substring(0, 2)}`;
}
