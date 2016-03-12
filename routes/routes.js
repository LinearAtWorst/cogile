var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../client/components/Main.js');
var Home = require('../client/components/Home.js');


var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <Route path='/home' component={Home} />
    </Route>
  </Router>
);

module.exports = routes;