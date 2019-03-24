import React, { useState, useEffect } from 'react'
import moment from 'moment'
import duration from 'moment-duration-format'
// import 'font-awesome/css/font-awesome.min.css'
// import './_article.scss'

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
    setTimeout(() => document.querySelectorAll('.hidden').forEach(item => item.classList.remove('hidden')), 100);

  }, []);

  const scrollTop = () => {
    document.querySelector('#topbar').scrollIntoView({ behavior: 'smooth' });
  }

  return (
    // Fetched content
    <React.Fragment>
      <div id="article">
        <meta name="objectData" content={JSON.stringify(props.data)} />
        {/* Image */}
        <div className="image" onClick={scrollTop}>
          <img src={images[2] ? images[2].url : (images[1] ? images[1].url : (images[0] ? images[0].url : ''))} alt={metadata.slug} draggable={false} />
          {/* Video Information */}
          {
            (!isNaN(metadata.duration)) ?
              <div className="video-info hidden">
                <i className="fas fa-play-circle" />
                <label> {convertDuration(metadata.duration)} </label>
              </div>
              : ''
          }
        </div>
        <div id="info">
          <div className='labels'>
            {/* Time since publication date */}
            <label>{sincePublication(metadata.publishDate)}</label>
            <span> - </span>
            < i className="far fa-comment" onClick={scrollTop}></i>
            {(commentCount > 0) ? <label className="commentCount" onClick={scrollTop}>{commentCount}</label> : ''}
          </div>
          {/* Headline display. Object data names differ between Articles and Videos,
        so their respective properties must be chosen.*/}
          <h3 onClick={scrollTop}>{metadata.headline ? metadata.headline : metadata.title}</h3>
        </div>
      </div>
      <hr className="line" />
    </React.Fragment >
  )
}

// Time since article was published
const sincePublication = (date) => {
  let pubDate = moment.utc(date),
    now = moment.utc(),

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
  if (duration < 10)
    return '0:0' + duration;
  if (duration < 60)
    return '0:' + duration;
  return moment.duration(duration, 'seconds').format('h:mm:ss');
}
