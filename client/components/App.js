import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsername, smashUser } from '../actions/index';
import { bindActionCreators } from 'redux';
import NavLink from './NavLink';
import { Link } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
  }

  smash() {
    if (this.props.getUsername().payload !== "guest"){
      this.props.smashUser();
      console.log('token removed');
    }
    console.log('not logged in');
  };

  render() {

    return (
      <div className='main-container'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-collapse navbar-responsive-collapse collapse in" aria-expanded="true">
              <Link to="/" onlyActiveOnIndex className="sitename pull-left">nimblecode</Link>
              <ul role="nav" className="nav navbar-nav navbar-right">
                <li><NavLink to="singleplayer" className="nav-label" onlyActiveOnIndex>Singleplayer</NavLink></li>
                <li><NavLink to="multiplayer" className="nav-label">Multiplayer</NavLink></li>
                <li><NavLink to="about" className="nav-label">About</NavLink></li>
                {
                  (this.props.getUsername().payload === 'guest')
                  ? 
                  <li><NavLink to="login" className="nav-label">Login</NavLink></li>
                  : 
                  <li>
                    <Link
                      to="/"
                      className="nav-label"
                      onClick={this.smash.bind(this)}>
                      Logout
                    </Link>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>

        {/* Rendering the children of this route below */}
        {this.props.children}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { SavedUsername: state.SavedUsername }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUsername: getUsername,
    smashUser: smashUser
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
