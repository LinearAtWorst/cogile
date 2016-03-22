import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import CodePrompt from '../components/CodePrompt';
import CodeGhost from '../components/CodeGhost';
import Timer from './Timer';
import levenshtein from './../lib/levenshtein';
import ProgressBar from '../components/ProgressBar';
import { connect } from 'react-redux';
import { startGame, endGame } from '../actions/index';
import { bindActionCreators } from 'redux';

class Singleplayer extends Component {
  constructor() {
    super();

    this.state = {
      currentPuzzle: 'N/A',
      minifiedPuzzle: 'N/A',
      gameFinished: false,
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

  saveTimeElapsed(tenthSeconds, seconds, minutes) {
    // Sweet Alert with Info
    swal({
      title: 'Sweet!',
      text: 'You completed the challenge with a time of ' + minutes + ':' + seconds + '.' + tenthSeconds
    });
  }

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
          saveTimeElapsed={this.saveTimeElapsed.bind(this)} />
        <CodeEditor
          puzzle={this.state.currentPuzzle}
          minifiedPuzzle={this.state.minifiedPuzzle}
          calculateProgress={this.calculateProgress.bind(this)} />
        <CodePrompt puzzle={this.state.currentPuzzle} />
        <CodeGhost />
        <ProgressBar percentComplete={this.state.progress} />
      </div>
    )
  };
}

export default Singleplayer;