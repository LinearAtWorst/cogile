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
      console.log('Setting state as puzzle : ', data);
    }.bind(this));
  }

  timerOn() {
    console.log('inside Home, called timerOn')
    this.setState({
      timerOn: true
    });
  };

  timerOff() {
    console.log('inside Home, called timerOff')
    this.setState({
      timerOn: false,
      gameFinished: true
    })
  };

  render() {
    console.log('Home Render called');
    return (
      <div>
        <Timer
          startTimer={this.timerOn.bind(this)} 
          gameFinished={this.state.gameFinished} />
        <CodeEditor
          puzzle={this.state.currentPuzzle}
          timerOn={this.state.timerOn}
          timerOff={this.timerOff.bind(this)} />
        <CodePrompt puzzle={this.state.currentPuzzle} />
      </div>
    )
  };
}

export default Home;
