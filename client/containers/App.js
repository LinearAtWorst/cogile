import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsername, smashUser } from '../actions/index';
import { bindActionCreators } from 'redux';
import NavLink from '../components/NavLink';
import { Link } from 'react-router';
import Radium from 'radium';
import color from 'color';
import helperFunctions from '../utils/helperFunctions';

var RadiumLink = Radium(Link)

class App extends Component {
  constructor(props) {
    super(props);
  }

  smash() {
    if (helperFunctions.isLoggedIn() === true){
      this.props.smashUser();
    }
  };

  render() {

    return (
      <div className='main-container'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-collapse navbar-responsive-collapse collapse in" aria-expanded="true">

              <RadiumLink
                to="/"
                onlyActiveOnIndex
                className="sitename"
                style={styles.base}>nimble<span id="code">code</span>
              </RadiumLink>

              <ul role="nav" className="nav navbar-nav navbar-right">
                <li className="nav-item"><NavLink to="singleplayer/js/00-forLoop" className="nav-label" onlyActiveOnIndex>Singleplayer</NavLink></li>
                <li className="nav-item"><NavLink to="multiplayer" className="nav-label">Multiplayer</NavLink></li>
                <li className="nav-item"><NavLink to="about" className="nav-label">About</NavLink></li>
                {
                  (helperFunctions.isLoggedIn() === false)
                  ?
                  <li><NavLink to="login" className="nav-label nav-login">Login</NavLink></li>
                  :
                  <li>
                    <RadiumLink
                      to="/"
                      className="nav-label"
                      onClick={this.smash.bind(this)}>
                      Logout
                    </RadiumLink>
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

var styles = {
  base: {
    color: '#eee',

    // Adding interactive state couldn't be easier! Add a special key to your
    // style object (:hover, :focus, :active, or @media) with the additional rules.
    ':hover': {
      color: color('#eee')
    },
    ':focus': {
      color: color('#eee'),
      textDecoration: 'none'
    }
  }
}

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
