import React, { Component } from 'react';
import NavLink from './NavLink';

class App extends Component {
  render() {
    return (
      <div className='main-container'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul role="nav" className="nav navbar-nav navbar-right">
              <li><NavLink to="/" className="nav-label" onlyActiveOnIndex>Home</NavLink></li>
              <li><NavLink to="/about" className="nav-label">About</NavLink></li>
            </ul>
            <NavLink to="/" onlyActiveOnIndex className="sitename">nimblecode</NavLink>
          </div>
        </nav>

        {/* Rendering the children of this route below */}
        {this.props.children}
      </div>
    );
  }
};

export default App;