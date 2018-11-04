import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      email: "",
      username: "",
      password: "",
      profilePhoto: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleSubmit(event) {
    event.preventDefault();
    let authType = this.props.signUp ? "signup" : "signin";
    this.props.onAuth(authType, this.state).then(() => {
        this.props.history.push("/");
      })
      .catch(() => {
        return;
      });
  };

  handleDismiss() {
    this.setState({visible: false})
  }


  render() { 
    const {email, username, password, profilePhoto} = this.state;
    const {buttonText, heading, signUp, errors, history, removeError} = this.props;

    history.listen(() => {
      removeError();
    });


    return ( 
      <div>
        <div className="row justify-content-md-center text-center">
        <div className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <h2>{heading}</h2>
            {errors.message && 
              <div className="alert alert-danger">{errors.message}</div>
            }
            <label htmlFor="email">Email</label>
            <input 
              className="form-control" 
              id="email" 
              name="email" 
              type="email" 
              onChange={this.handleChange} 
              value={email} 
            />
            <label htmlFor="password">Password</label>
            <input 
              className="form-control" 
              id="password" 
              name="password" 
              type="password"
              value={password}
              onChange={this.handleChange} 
            />

            {signUp && (
              <div>
              <label htmlFor="username">Username</label>
              <input 
                className="form-control" 
                id="username" 
                name="username" 
                type="text" 
                onChange={this.handleChange} 
                value={username} 
              />
              <label htmlFor="image-url">Profile Photo</label>
              <input 
                className="form-control" 
                id="image-url" 
                name="profilePhoto"
                value={profilePhoto}
                type="text" 
                onChange={this.handleChange} 
              />
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-lg">{buttonText}</button>
          </form>
        </div>
        </div>
      </div>
    );
  }
}
 
export default AuthForm;