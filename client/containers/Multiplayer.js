import React, { Component } from 'react';
import CodeEditorMulti from './CodeEditorMulti';
import CodePrompt from '../components/CodePrompt';
import TimerMulti from './TimerMulti';
import levenshtein from './../lib/levenshtein';
import ProgressBarMulti from './ProgressBarMulti';
import { connect } from 'react-redux';
import { startGame, endGame, stopTimer, updateProgresses } from '../actions/index';
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

    // send new player's info to global store
    this.socket.on('player joined', function(players) {
      this.props.updateProgresses(players);
    }.bind(this));

    // listening for a 'all players progress' socket event and
    // collects all players' code from socket
    this.socket.on('all players progress', function(players) {
      underscore.map(players, function(obj, key){
        var playerPercent = this.calculatePercent(obj[2]);
        players[key][1] = playerPercent;
      }.bind(this));
      this.props.updateProgresses(players);

    }.bind(this));

    // listening for a 'game over' socket event to capture and stop time
    this.socket.on('game over', function(value) {
      var time = this.props.gameTime;
      underscore.once(this.saveTimeElapsed(time.tenthSeconds, time.seconds, time.minutes, value));

      this.props.stopTimer();
    }.bind(this));
  };

  componentWillUnmount() {
    this.socket.disconnect();
  };

  componentDidUpdate() {
    // if player finishes the puzzle, END_GAME action is sent, and 'game won' socket emitted
    if (this.props.multiGame === 'END_GAME') {
      var socketInfo = {
        id: this.socket.id,
        hasWon: true
      };
      underscore.once(this.socket.emit('game won', socketInfo));
    }
  };

  saveTimeElapsed(tenthSeconds, seconds, minutes, winner) {
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
  };

  calculatePercent(playerCode) {
    var miniCode = playerCode.replace(/\s/g,'');
    var totalChars = this.state.minifiedPuzzle.length;
    var distance = levenshtein(this.state.minifiedPuzzle, miniCode);

    var percentCompleted = Math.floor(((totalChars - distance) / totalChars) * 100);
    return percentCompleted;
  };

  // sends current player's code to the socket to broadcast
  updateAllProgress(code) {
    var value = {
      id: this.socket.id,
      code: code
    }

    this.socket.emit('player progress', value);
  };

  render() {
    return (
      <div>
        <TimerMulti
          saveTimeElapsed={this.saveTimeElapsed.bind(this)}
          socket={this.socket} />
        <CodePrompt puzzle={this.state.currentPuzzle} />
        <CodeEditorMulti
          puzzle={this.state.currentPuzzle}
          minifiedPuzzle={this.state.minifiedPuzzle}
          calculateProgress={this.calculateProgress.bind(this)}
          updateAllProgress={this.updateAllProgress.bind(this)} />
        <ProgressBarMulti />
      </div>
    )
  };
};

function mapStateToProps(state) {
  return {
    multiGame: state.multiGame,
    gameTime: state.gameTime,
    multiGameProgress: state.multiGameProgress
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startGame: startGame,
    endGame: endGame,
    stopTimer: stopTimer,
    updateProgresses: updateProgresses
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
