import React, { Component } from 'react';
import CodeEditorMulti from './CodeEditorMulti';
import CodePrompt from './CodePrompt';
import TimerMulti from './TimerMulti';
import levenshtein from './../lib/levenshtein';
import ProgressBar from './ProgressBar';

class Multiplayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPuzzle: 'N/A',
      timerOn: false,
      gameFinished: false,
      minifiedPuzzle: 'N/A',
      progress: 0,
      multiGameStarted: false
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

    this.socket.on('multigame start', function(value) {
      console.log('multigame is starting!')
      this.setState({multiGameStarted: true});
    }.bind(this));
  }

  componentWillUnmount() {
    this.socket.disconnect();
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
        <TimerMulti
          socket={this.socket}
          timerOn={this.timerOn.bind(this)} 
          gameFinished={this.state.gameFinished}
          multiGameStarted={this.state.multiGameStarted} />
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
