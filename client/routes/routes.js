import React from 'react';
import { Router, Route, browserHistory, hashHistory, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import App from '../containers/App.js';
import Singleplayer from '../containers/Singleplayer.js';
import Multiplayer from '../containers/Multiplayer.js';
import About from '../components/About';
import LandingPage from '../components/LandingPage';
import LandingPageMulti from '../containers/LandingPageMulti';
import Login from '../components/Login';
import Register from '../components/Register';
import helperFunctions from '../utils/helperFunctions';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false});

var routes = (
  <Router history={appHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LandingPage} />
      <Route path='/singleplayer' component={Singleplayer}/>
      <Route path='/singleplayer/:puzzleName' component={Singleplayer}/>
      <Route path='/about' component={About}/>
      <Route path='/multiplayer' component={LandingPageMulti} />
      <Route path='/multigame/:gameId' component={Multiplayer}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </Route>
  </Router>
);

module.exports = routes;
