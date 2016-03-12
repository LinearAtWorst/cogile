var React = require('react');

var Main = React.createClass({
  render: function() {
    return (
      <div className='main-container'> Hi from Main! 
        {this.props.children}
      </div>
    )
  }
});

module.exports = Main;