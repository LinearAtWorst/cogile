import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from '../client/components/App.js';
import Home from '../client/components/Home.js';
import Multiplayer from '../client/components/Multiplayer.js';
import About from '../client/components/About';


var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/about' component={About}/>
      <Route path='/multiplayer' component={Multiplayer}/>
    </Route>
  </Router>
);

module.exports = routes;