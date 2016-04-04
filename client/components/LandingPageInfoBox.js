import React, { Component } from 'react';

class LandingPageInfoBox extends Component {
  render() {
    return (
      <div className="col-sm-4">
        <h3 className="text-center">{this.props.title}</h3>
        {this.props.text}
      </div>
    );
  }
}

export default LandingPageInfoBox;