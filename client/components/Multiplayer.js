import React, { Component } from 'react';
// import io from 'socket.io-client';
// var Socket = require('react-socket').Socket;
import CodeEditorMulti from './CodeEditorMulti';
import CodePrompt from './CodePrompt';
import Timer from './Timer';
import levenshtein from './../lib/levenshtein';
import ProgressBar from './ProgressBar';



class Multiplayer extends Component {
  constructor(props) {
    super(props);
    
    // let host = location.origin.replace(/^http/, 'ws');
    // let socket = io.connect(host);

    this.state = {
      currentPuzzle: 'N/A',
      timerOn: false,
      gameFinished: false,
      minifiedPuzzle: 'N/A',
      progress: 0
    };
  };

  componentWillMount() {
    $.get('api/getPrompt', function(data) {
      var minifiedPuzzle = data.replace(/\s/g,'');
      console.log('Minified: ', minifiedPuzzle);

      this.setState({
        currentPuzzle: data,
        minifiedPuzzle: minifiedPuzzle
      });
    }.bind(this));
  };

  componentDidMount() {
    this.socket = io();

    console.log(this.socket);

    // if someone in the game wins, socket will broadcast a 'game over' event to all
    this.socket.on('game over', function(value) {
      console.log('game over, ', value.id, 'won');
      this.puzzleCompleted();
    }.bind(this));
  }

  componentWillUnmount() {
    this.socket.disconnect();
    console.log(this.socket);
  }

  timerOn() {
    this.setState({
      timerOn: true
    });
  };

  puzzleCompleted() {
    this.setState({
      timerOn: false,
      gameFinished: true
    });
  };

  calculateProgress(playerCode) {
    var totalChars = this.state.minifiedPuzzle.length;
    var distance = levenshtein(this.state.minifiedPuzzle, playerCode);

    var percentCompleted = Math.floor(((totalChars - distance) / totalChars) * 100);
    
    this.setState({
      progress: percentCompleted
    });
  };

  
  render() {
    return (
      <div>
        <Timer
          gameStart={this.timerOn.bind(this)} 
          gameFinished={this.state.gameFinished} />
        <CodeEditorMulti
          socket={this.socket}
          puzzle={this.state.currentPuzzle}
          timerOn={this.state.timerOn}
          puzzleCompleted={this.puzzleCompleted.bind(this)}
          minifiedPuzzle={this.state.minifiedPuzzle}
          calculateProgress={this.calculateProgress.bind(this)} />
        <CodePrompt puzzle={this.state.currentPuzzle} />
        <ProgressBar percentComplete={this.state.progress} />
      </div>
    )
  };
}

export default Multiplayer;
