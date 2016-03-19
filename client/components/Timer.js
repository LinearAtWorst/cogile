import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame, endGame } from '../actions/index';
import { bindActionCreators } from 'redux';
import CountdownTimer from './CountdownTimer';
import StartButton from './StartButton';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenthSeconds: 0,
      seconds: 0,
      minutes: 0,
      message: 'Click the start button to begin!',
      countingDown: false,
      showButton: true
    }
  };

  startCountdown() {
    this.setState({
      countingDown: true,
      showButton: false
    });
  }

  startTimer() {
    this.setState({
      countingDown: false,
      showButton: true,
      message: '0.0'
    });

    this.props.timerOn();

    // testing SingleTimer action
    this.props.startGame();

    this.intervalID = setInterval(function() {
      var tenthSeconds = this.state.tenthSeconds + 1;
      var seconds = this.state.seconds;
      var minutes = this.state.minutes;

      if (tenthSeconds > 9) {
        seconds++;
        tenthSeconds = 0;
      }

      if (seconds > 59) {
        minutes++;
        seconds = 0;
      }

      this.setState({
        tenthSeconds : tenthSeconds,
        seconds : seconds,
        minutes: minutes,
        message: this.state.minutes + ':' + this.state.seconds + '.' + this.state.tenthSeconds
      });
    }.bind(this), 100);
  } 

  componentDidUpdate() {
    if (this.props.singleTimer === 'END_GAME') {
      console.log('inside Timer componentDidUpdate END_GAME state');
      clearInterval(this.intervalID);
      // this.props.timerOff(this.state.tenthSeconds, this.state.seconds, this.state.minutes);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className="text-center">{this.state.message}</h2>
        </div>
        <StartButton
          showButton={this.state.showButton}
          startCountdown={this.startCountdown.bind(this)} />
        <CountdownTimer
          countingDown={this.state.countingDown}
          onCountdownFinish={this.startTimer.bind(this)} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    singleTimer: state.singleTimer
  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({startGame: startGame, endGame: endGame}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
// export default Timer;