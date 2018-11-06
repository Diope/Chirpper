import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchTweets} from '../store/actions/tweets';
import TweetItem from '../components/TweetItem';

class TweetList extends Component {
  componentDidMount() {
    this.props.fetchTweets();
  }

  render() {
    const {tweets} = this.props;
    let tweetList = tweets.map(t => (
      <TweetItem 
        key={t._id}
        date={t.createdAt}
        text={t.text}
        username={t.user.username}
        profilePhoto={t.user.profilePhoto}
      />
    ));
    if (!tweets) {
      return (
        <h1>LOADING</h1>
      )
    } else {
      return tweetList;
    }
  }
}

function mapStateToProps(state) {
  return {
    tweets: state.tweets
  }
}
 
export default connect(mapStateToProps, {fetchTweets})(TweetList);