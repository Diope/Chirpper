import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import defaultAvatar from '../images/default-avatar.png';

const TweetItem = ({date, profilePhoto, text, username}) => (
  <div>
    <img src={profilePhoto || defaultAvatar} alt={username} height="42" width="42" className="timeline-avatar" />
    <div className="tweet-area">
      <Link to="#">@{username}&nbsp;</Link>
      <span className="text-muted">
        <Moment className="text-muted" format="Do MM YYYY">{date}</Moment>
      </span>
      <div className="tweet">{text}</div>
    </div>
  </div>
)

export default TweetItem;