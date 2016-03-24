import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { storeUsername } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, hashHistory, IndexRoute, useRouterHistory } from 'react-router';
import axios from 'axios';

class Login extends Component {

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
      <h1 className="about-title">LOGIN</h1>
      <div className="row row-spacer"></div>
      <form className="form" onSubmit={this._onSubmit.bind(this)}>
        <div className="form-group label-floating">
        <label htmlFor="username" className="control-label">Username</label>
          <input type="text" id="username" className="form-control" value={this.state.username} onChange={this._changeUsername.bind(this)} />
        </div>
        <div className="form-group label-floating">
        <label htmlFor="password" className="control-label">Password</label>
          <input id="password" type="password" className="form-control" value={this.state.password} onChange={this._changePassword.bind(this)} />
        </div>
        <center><div className="row">
        <button className="btn btn-raised" type="submit">Login</button>
        <p className="lead">OR</p>
        <a className="btn btn-raised"><span className="fa fa-github fa-3x"></span> Login with Github</a>
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

    axios.post('/api/users/signin', {
        username: this.state.username,
        password: this.state.password
      })
      .then(function(response) {
        console.log('response',response);
        if (response.data.isValid === true) {
          global.window.localStorage.setItem('com.nimblecode', response.data.token);
          browserHistory.push('/');
          console.log("successful login");
          // this.props.storeUsername(this.state.username);

        } else {
          console.log("unsuccessful login");
          return false;
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
    storeUsername: storeUsername
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
