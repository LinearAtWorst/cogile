import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { storeUsername, getUsername } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, hashHistory, IndexRoute, useRouterHistory } from 'react-router';
import axios from 'axios';

class Login extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      usernameFail: false,
      passwordFail: false
    }
  };

  render() {
    return(
      <div className="container">
      <div className="col-sm-3"></div>
      <div className="col-sm-6">
      <h1 className="about-title">LOGIN</h1>
      <div className="row row-spacer"></div>
      <div className="text-center">Don't have an account? Register <a href="/#/register">here</a>. Only logged in users can access Multiplayer!</div>
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
        <br />
        <div className="row text-center">{this.state.passwordFail ? (
     <p className="failed-validation">Wrong password, fam.</p>
        ) :
        null  }

        {this.state.usernameFail ? (
     <p className="failed-validation">Username doesn't exist. Please register an account with us.</p>
        ) :
        null  }
        </div>
        {/*<p className="lead">OR</p>
        <a className="btn btn-raised"><span className="fa fa-github fa-3x"></span> Login with Github</a>*/}
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

    axios.post('/api/users/signin', {
        username: this.state.username,
        password: this.state.password
      })
      .then(function(response) {
        console.log('response',response);
        if (response.data.isValid === true) {
          // saving token to localStorage
          global.window.localStorage.setItem('com.nimblecode', response.data.token);
          console.log("successful login");

          // storing username into Redux App State
          this.props.storeUsername(this.state.username);

          // redirecting to homepage
          this.context.router.push('/');
        } else {
          if ( response.data.usernameFailed === true ) {
            this.setState({
                  usernameFail: true,
                  passwordFail: false
            });
          }

          if ( response.data.passwordFailed === true ) {
            this.setState({
              usernameFail: false,
              passwordFail: true
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
