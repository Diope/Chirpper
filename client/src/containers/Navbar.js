import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import {logout} from '../store/actions/auth';

class Navbar extends Component {
  logout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  state = {  }
  render() { 
    return ( 
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Chirpper
          </Link>
          {this.props.currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link 
                  to={`/users/${this.props.currentUser.user.id}/messages/new`}
                >
                  Tweet
                </Link>
              </li>
              <li>
                <a onClick={this.logout}>Log Out</a>
              </li>
            </ul>
          ) : (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/signin">Log In</Link>
          </li>
        </ul>
          )}
        </div>
      </nav>
     );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}
 
export default connect(mapStateToProps, {logout})(Navbar);