import React, { Component } from 'react';
import NavLink from './NavLink';

class App extends Component {
  render() {

    return (
      <div className='main-container'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-collapse navbar-responsive-collapse collapse in" aria-expanded="true">
              <NavLink to="/" onlyActiveOnIndex className="sitename pull-left">nimblecode</NavLink>
              <ul role="nav" className="nav navbar-nav navbar-right">
                <li><NavLink to="" className="nav-label" onlyActiveOnIndex>Singleplayer</NavLink></li>
                <li><NavLink to="multiplayer" className="nav-label">Multiplayer</NavLink></li>
                <li><NavLink to="about" className="nav-label">About</NavLink></li>
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

export default App;