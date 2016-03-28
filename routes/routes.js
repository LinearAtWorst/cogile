import React from 'react';
import { Router, Route, browserHistory, hashHistory, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import App from '../client/components/App.js';
import Singleplayer from '../client/containers/Singleplayer.js';
import Multiplayer from '../client/containers/Multiplayer.js';
import About from '../client/components/About';
import LandingPage from '../client/components/LandingPage';
import LandingPageMulti from '../client/containers/LandingPageMulti';
import Login from '../client/components/Login';
import Register from '../client/components/Register';
import helperFunctions from '../client/utils/helperFunctions';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false});

var routes = (
  <Router history={appHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LandingPage} />
      <Route path='/singleplayer' component={Singleplayer}/>
      <Route path='/singleplayer/:puzzleName' component={Singleplayer}/>
      <Route path='/about' component={About}/>
      <Route path='/multiplayer' component={LandingPageMulti} onEnter={helperFunctions.requireAuth}/>
      <Route path='/multigame/:gameId' component={Multiplayer}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </Route>
  </Router>
);

module.exports = routes;
