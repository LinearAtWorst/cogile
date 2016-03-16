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
      console.log('inside get Home\'s get req with this = ', this);
      this.setState({
        currentPuzzle: data
      });
      // console.log('Setting state as puzzle : ', data);
    }.bind(this));
  }

  timerOn() {
    console.log('inside Home, called timerOn')
    this.setState({
      timerOn: true
    });
  };

  puzzleCompleted() {
    console.log('inside Home, called timerOff')
    this.setState({
      timerOn: false,
      gameFinished: true
    })
    console.log(this.state);
  };

  render() {
    console.log('Home Render called');
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
