import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsername, smashUser } from '../actions/index';
import { bindActionCreators } from 'redux';
import NavLink from './NavLink';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.getUsername().payload
    };
  }

  componentDidMount() {
    console.log(this.props.getUsername());
  }

  smash() {
    if (this.props.getUsername().payload !== "guest"){
      this.props.smashUser();
      console.log('token removed');
      this.setState({
        username: 'guest'
      });
      return true;
    }
    console.log('not logged in');
    return false;
  };

  render() {

    return (
      <div className='main-container'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-collapse navbar-responsive-collapse collapse in" aria-expanded="true">
              <NavLink to="/" onlyActiveOnIndex className="sitename pull-left">nimblecode</NavLink>
              <ul role="nav" className="nav navbar-nav navbar-right">
                <li><NavLink to="singleplayer" className="nav-label" onlyActiveOnIndex>Singleplayer</NavLink></li>
                <li><NavLink to="multiplayer" className="nav-label">Multiplayer</NavLink></li>
                <li><NavLink to="about" className="nav-label">About</NavLink></li>
                { /*<li><h3 className="nav-label">Welcome, {this.props.getUsername().payload}!</h3></li> */}
                {
                  (this.state.username === 'guest')
                  ? 
                  <li><NavLink to="login" className="nav-label">Login</NavLink></li>
                  : 
                  <li>
                    <NavLink
                      to="/"
                      className="nav-label"
                      onClick={this.smash.bind(this)}
                      onlyActiveOnIndex>
                      Logout
                    </NavLink>
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
  return {}
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUsername: getUsername,
    smashUser: smashUser
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
