import React from 'react';
import { Router, Route, browserHistory, hashHistory, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import App from '../containers/App.js';
import Singleplayer from '../containers/Singleplayer.js';
import Multiplayer from '../containers/Multiplayer.js';
import About from '../components/About';
import LandingPage from '../components/LandingPage';
import LandingPageMulti from '../containers/LandingPageMulti';
import Login from '../containers/Login';
import helperFunctions from '../utils/helperFunctions';
import ga from 'ga-react-router';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false});

// Listen for changes to the current location. The
// listener is called once immediately.
const unlisten = appHistory.listen(location => {
  ga('send', location);
});

var routes = (
  <Router history={appHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LandingPage} />
      <Route path='/singleplayer' component={Singleplayer}/>
      <Route path='/singleplayer/:lang/:puzzleName' component={Singleplayer}/>
      <Route path='/about' component={About}/>
      <Route path='/multiplayer' component={LandingPageMulti} />
      <Route path='/multigame/:gameId' component={Multiplayer}/>
      <Route path='/login' component={Login}/>
    </Route>
  </Router>
);

// When you're finished, stop the listener.
unlisten();

module.exports = routes;
