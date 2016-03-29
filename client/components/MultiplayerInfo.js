import React, { Component } from 'react';

class MultiplayerInfo extends Component {
  constructor(props) {
    super(props);

    this.link = "http://nimblecode.io/#/multigame/" + this.props.gameId;
  }

  render() {
    return (
      <div className="col-sm-12">
        <h3 className="text-center">Multiplayer Game {this.props.gameId}</h3>
      </div>
    );
  }
}

export default MultiplayerInfo;