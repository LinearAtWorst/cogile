import React, { Component } from 'react';
// import io from 'socket.io-client';
// var Socket = require('react-socket').Socket;


class Multiplayer extends Component {
  constructor(props) {
    super(props);
    
    // let host = location.origin.replace(/^http/, 'ws');
    // let socket = io.connect(host);

    this.state = {
      // socket
    };
  };

  componentDidMount() {

    this.socket = io();

    console.log(this.socket);
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div>
        Under construction...
        { /*<Socket url="localhost:8080"/> */}
      </div>
    )
  };
}

export default Multiplayer;
