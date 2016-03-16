import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import CodePrompt from './CodePrompt';
import Timer from './Timer';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentPuzzle: '',
      timerOn: false,
      gameFinished: false
    };
  };

  componentWillMount() {
    $.get('api/getPrompt', function(data) {
      this.setState({
        currentPuzzle: data
      });
    }.bind(this));
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
    })
  };

  render() {
    return (
      <div>
        <Timer
          gameStart={this.timerOn.bind(this)} 
          gameFinished={this.state.gameFinished} />
        <CodeEditor
          puzzle={this.state.currentPuzzle}
          timerOn={this.state.timerOn}
          puzzleCompleted={this.puzzleCompleted.bind(this)} />
        <CodePrompt puzzle={this.state.currentPuzzle} />
      </div>
    )
  };
}

export default Home;
