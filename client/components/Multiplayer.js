import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import CodePrompt from './CodePrompt';
import Timer from './Timer';
import levenshtein from './../lib/levenshtein';
import ProgressBar from './ProgressBar';
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
