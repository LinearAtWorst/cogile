import React, { Component } from 'react';
import CodeEditorMulti from './CodeEditorMulti';
import CodePrompt from '../components/CodePrompt';
import TimerMulti from './TimerMulti';
import levenshtein from './../lib/levenshtein';
import ProgressBar from '../components/ProgressBar';
import { connect } from 'react-redux';
import { startGame, endGame, stopTimer } from '../actions/index';
import { bindActionCreators } from 'redux';
import underscore from 'underscore';

class Multiplayer extends Component {
  constructor() {
    super();

    this.state = {
      currentPuzzle: 'N/A',
      minifiedPuzzle: 'N/A',
      gameFinished: false,
      progress: 0
    };

    this.playersProgress = {};
  };

  componentWillMount() {
    $.get('api/getPrompt', function(data) {
      var minifiedPuzzle = data.replace(/\s/g,'');

      this.setState({
        currentPuzzle: data,
        minifiedPuzzle: minifiedPuzzle
      });
    }.bind(this));
  };

  componentDidMount() {
    this.socket = io();

    console.log('inside multiplayer compDidMount, socket is: ', this.socket);

    this.socket.on('game over', function(value) {
      var socket = value;

      var time = this.props.gameTime;
      underscore.once(this.saveTimeElapsed(time.tenthSeconds, time.seconds, time.minutes, value));

      this.props.stopTimer();
    }.bind(this));
  };

  componentWillUnmount() {
    this.socket.disconnect();
  };

  componentDidUpdate() {
    // console.log(this.props.gameTime);
    if (this.props.multiGame === 'END_GAME') {
      // var time = this.props.gameTime;
      // underscore.once(this.saveTimeElapsed(time.tenthSeconds, time.seconds, time.minutes, this.socket));

      var socketInfo = {
        id: this.socket.id,
        hasWon: true
      };
      underscore.once(this.socket.emit('game won', socketInfo));
    }
  };

  saveTimeElapsed(tenthSeconds, seconds, minutes, winner) {
    console.log('called saveTimeElapsed with winner: ', winner);
    if (winner.id === this.socket.id) {
      // Sweet Alert with Info
      swal({
        title: 'Sweet!',
        text: 'You completed the challenge with a time of ' + minutes + ':' + seconds + '.' + tenthSeconds
      });
    } else {
      // if current player is not the winner, display winner's ID
      swal({
        title: 'Sorry!',
        text: winner.id + ' won with a time of ' + minutes + ':' + seconds + '.' + tenthSeconds
      });
    }
  };

  calculateProgress(playerCode) {
    var totalChars = this.state.minifiedPuzzle.length;
    var distance = levenshtein(this.state.minifiedPuzzle, playerCode);

    var percentCompleted = Math.floor(((totalChars - distance) / totalChars) * 100);

    this.setState({
      progress: percentCompleted
    });

    // emit event to socket that game is over
    if (percentCompleted === 100) {
      // var socketInfo = {
      //   id: this.socket.id,
      //   hasWon: true
      // };
      // this.socket.emit('game won', socketInfo);
    }
  };

  updateAllProgress(code) {
    var temp = {
      id: this.socket.id,
      code: code
    }

    this.socket.emit('player progress', temp);
  };

  render() {
    return (
      <div>
        <TimerMulti
          saveTimeElapsed={this.saveTimeElapsed.bind(this)}
          socket={this.socket} />
        <CodeEditorMulti
          puzzle={this.state.currentPuzzle}
          minifiedPuzzle={this.state.minifiedPuzzle}
          calculateProgress={this.calculateProgress.bind(this)}
          updateAllProgress={this.updateAllProgress.bind(this)} />
        <CodePrompt puzzle={this.state.currentPuzzle} />
        <ProgressBar percentComplete={this.state.progress} />
      </div>
    )
  };
};

function mapStateToProps(state) {
  return {
    multiGame: state.multiGame,
    gameTime: state.gameTime
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({startGame: startGame, endGame: endGame, stopTimer: stopTimer}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
