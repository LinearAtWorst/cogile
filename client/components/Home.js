import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import CodePrompt from './CodePrompt';
import Timer from './Timer';
import levenshtein from './../lib/levenshtein'

class Home extends Component {
  constructor() {
    super();

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

  calculateProgress(playerCode) {
    var totalChars = this.state.minifiedPuzzle.length;
    var distance = levenshtein(this.state.minifiedPuzzle, playerCode);

    var percentCompleted = Math.floor(((totalChars - distance) / totalChars) * 100);
    console.log(percentCompleted);

  }

  // componentDidMount() {
  //   console.log(levenshtein('abc', 'ase'));
  // }

  render() {
    return (
      <div>
        <Timer
          gameStart={this.timerOn.bind(this)} 
          gameFinished={this.state.gameFinished} />
        <CodeEditor
          puzzle={this.state.currentPuzzle}
          timerOn={this.state.timerOn}
          puzzleCompleted={this.puzzleCompleted.bind(this)}
          minifiedPuzzle={this.state.minifiedPuzzle}
          calculateProgress={this.calculateProgress.bind(this)} />
        <CodePrompt puzzle={this.state.currentPuzzle} />
      </div>
    )
  };
}

export default Home;
