import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reactRoutes from './../routes/routes.js';
import NavBar from './components/navBar.js';

class TestDiv extends Component {
  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

ReactDOM.render(<TestDiv />, document.getElementById('app'));


// ReactDOM.render(reactRoutes, document.getElementById('app'));