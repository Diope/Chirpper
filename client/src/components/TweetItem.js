import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import defaultAvatar from '../images/default-avatar.png';

let styles = {
  avatar: {
    borderRadius: '50%',
    height: 50,
    width: 50
  },
  profilePhotoContainer: {
    padding: '0px 15px'
  },
  listItem: {
    display: 'flex',
    alignItem: 'flex-start',
    padding: '8px 0px',
    minHeight: '120px',
    borderRadius: 0
  }
}

const TweetItem = ({date, profilePhoto, text, username}) => (
  <div>
    <li className="list-group-item" style={styles.listItem}>
      <div className="profilephoto" style={styles.profilePhotoContainer}>
        <img src={profilePhoto || defaultAvatar} alt={username} className="timeline-avatar" style={styles.avatar} />
      </div>
      <div className="tweet-area">
        <Link to="#">@{username}&nbsp;</Link>
        <span className="text-muted">・<Moment fromNow>{date}</Moment></span>
        <div className="tweet">{text}</div>
      </div>
    </li>
  </div>
)

export default TweetItem;