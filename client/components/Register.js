import React, { PropTypes, Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  };

  render() {
    return(
      <div className="container col-sm-6">
      <h3>Register an account</h3>
      <form className="form" onSubmit={this._onSubmit.bind(this)}>
        <div className="form-group label-floating">
        <label htmlFor="username" className="control-label">Username</label>
          <input type="text" id="username" className="form-control" value={this.state.username} onChange={this._changeUsername.bind(this)} />
        </div>
        <div className="form-group label-floating">
        <label htmlFor="password" className="control-label">Password</label>
          <input id="password" type="password" className="form-control" value={this.state.password} onChange={this._changePassword.bind(this)} />
        </div>
        <center><div className="btn-group btn-group-raised">
        <button className="btn" type="submit">Register</button>
        </div></center>
      </form>
      </div>
    );
  }

  _changeUsername(username) {
    this.setState({
      username: username.target.value
    });
  }

  _changePassword(password) {
    this.setState({
      password: password.target.value
    });
  }

  _onSubmit(evt) {
    evt.preventDefault();

    axios.post('/api/users/signup', {
        username: this.state.username,
        password: this.state.password
      })
      .then(function(response) {
        console.log('response',response);
        if (response.data.isValid === true) {
          global.window.localStorage.setItem('com.nimblecode', response.data.token);
          console.log("successful signup");
          return true;
        } else {
          console.log("unsuccessful signup");
          return false;
        }
      })
      .catch(function(response) {
        console.log(response);
      });

  }
}

export default Register;
