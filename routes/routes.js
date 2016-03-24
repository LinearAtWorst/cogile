import React from 'react';
import { Router, Route, browserHistory, hashHistory, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import App from '../client/components/App.js';
import Singleplayer from '../client/containers/Singleplayer.js';
import Multiplayer from '../client/containers/Multiplayer.js';
import About from '../client/components/About';
import Login from '../client/components/Login';
import Register from '../client/components/Register';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false});

var routes = (
  <Router history={appHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Singleplayer} />
      <Route path='/singleplayer/:puzzleName' component={Singleplayer}/>
      <Route path='/about' component={About}/>
      <Route path='/multiplayer' component={Multiplayer}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </Route>
  </Router>
);

module.exports = routes;
