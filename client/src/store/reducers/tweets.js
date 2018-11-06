import { LOAD_TWEETS, REMOVE_TWEET } from '../actionTypes'

const tweet = (state=[], action) => {
  switch (action.type) {
    case LOAD_TWEETS:
      return [...action.tweets]
    default:
      return state;
  }
}

export default tweet;