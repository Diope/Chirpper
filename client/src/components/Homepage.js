import React from 'react'
import {Link} from 'react-router-dom';
import TweetTimeLine from './TweetTimeLine';

const Homepage = ({currentUser}) => {
  if (!currentUser.isAuthenticated) {
    return ( 
        <div className="hero__log">
            <div className="hero__text-align">
              <h1>See what’s happening in the world right now</h1>
              <h4>Join Chirpper today.</h4>
              <Link to="/signup" className="btn btn-lg btn-primary">Sign Up</Link>
              <Link to="/signup" className="btn btn-lg btn-dark">Log In</Link>
            </div>
          </div>
    );
  }
   return (
    <React.Fragment>
      <TweetTimeLine />
    </React.Fragment>
  );
};
 
export default Homepage;