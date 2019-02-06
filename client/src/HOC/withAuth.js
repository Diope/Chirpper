import React, { Component } from 'react'
import {connect} from 'react-redux';

export default function (ComponentToRender) {
  class Authenticate extends Component {
    componentDidMount = () => {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/signin")
      }
    }
    componentDidUpdate(nextProps) {
      if (!this.nextProps.isAuthenticated){
        this.props.history.push("/signin")
      }
    }
    render() {
      return (
         <ComponentToRender {...this.props} />
      )
    }
  }
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.currentUser.isAuthenticated
    }
  }

return connect(mapStateToProps)(Authenticate);
}