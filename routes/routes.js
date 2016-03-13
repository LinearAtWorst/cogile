var React = require('react');
// var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
// var hashHistory = ReactRouter.hashHistory;
// var IndexRoute = ReactRouter.IndexRoute;
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
var App = require('../client/components/App.js');
var Home = require('../client/components/Home.js');
// var About = require('../client/components/About.js');
import About from '../client/components/About';


var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/about' component={About}/>
    </Route>
  </Router>
);

module.exports = routes;