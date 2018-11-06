import { LOAD_TWEETS, REMOVE_TWEET } from '../actionTypes'

const tweets = (state=[], action) => {
  switch (action.type) {
    case LOAD_TWEETS:
      return [...action.tweets]
    default:
      return state;
  }
}

export default tweets;