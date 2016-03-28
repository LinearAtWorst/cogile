import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { storeUsername, getUsername } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, hashHistory, IndexRoute, useRouterHistory } from 'react-router';
import axios from 'axios';

class Register extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      usernameExists: false
    }
  };

  render() {
    return(
      <div className="container">
      <div className="col-sm-3"></div>
      <div className="col-sm-6">
      <h1 className="about-title">REGISTER ACCOUNT</h1>
      <form className="form" onSubmit={this._onSubmit.bind(this)}>
        <div className="form-group label-floating">
        <label htmlFor="username" className="control-label">Username</label>
          <input type="text" id="username" className="form-control" value={this.state.username} onChange={this._changeUsername.bind(this)} />
        </div>
        <div className="row text-center"> {this.state.usernameExists ? (
       <p className="failed-validation">Username is taken already!</p>
        ) :
        null  }
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
      <div className="col-sm-3"></div>
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

          // storing username into Redux App State
          this.props.storeUsername(this.state.username);

          // redirecting to homepage
          this.context.router.push('/');
        } else {
          if ( response.data.usernameExists === true ) {
            this.setState({
              usernameExists: true
            });
        }
      }
      }.bind(this))
      .catch(function(response) {
        console.log(response);
      });

  }
}

function mapStateToProps(state) {
  return {
    SavedUsername: state.SavedUsername
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    storeUsername: storeUsername,
    getUsername: getUsername
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
