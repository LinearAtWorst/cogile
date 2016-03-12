var React = require('react');
var ReactDOM = require('react-dom');
// var reactRoutes = require('./../routes/routes.js');

var TestDiv = React.createClass({
  render: function() {
    return (<div>REACT DIV : HELLO REACT</div>);
  }
});

ReactDOM.render(<TestDiv />, document.getElementById('app'));


// ReactDOM.render(reactRoutes, document.getElementById('app'));