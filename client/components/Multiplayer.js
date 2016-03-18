import React, { Component } from 'react';
import io from 'socket.io-client';

class Multiplayer extends Component {
  constructor() {
    super();

    let host = location.origin.replace(/^http/, 'ws');
    let socket = io.connect(host);

    this.state = {
      socket
    };
  };

  render() {
    return (
      <div>
        Under construction...
      </div>
    )
  };
}

export default Multiplayer;
