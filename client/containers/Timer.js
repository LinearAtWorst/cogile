import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CountdownTimer from './CountdownTimer';
import StartButton from './StartButton';
import { leavePage, updateElapsedTime } from '../actions/index';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hundredthSeconds: 0,
      tenthSeconds: 0,
      seconds: 0,
      minutes: 0,
      message: 'Click the start button to begin!',
      timerOn: false
    }
  };

  startTimer() {
    this.setState({
      timerOn: true,
      message: '0.0'
    });

    this.intervalID = setInterval(function() {
      var hundredthSeconds = this.state.hundredthSeconds + 1;
      var tenthSeconds = this.state.tenthSeconds;
      var seconds = this.state.seconds;
      var minutes = this.state.minutes;

      if (hundredthSeconds > 9) {
        tenthSeconds++;
        hundredthSeconds = 0;
      }

      if (tenthSeconds > 9) {
        seconds++;
        tenthSeconds = 0;
      }

      if (seconds > 59) {
        minutes++;
        seconds = 0;
      }

      var totalTimeInSeconds = ((minutes * 60) + seconds + (tenthSeconds / 10) + (hundredthSeconds / 100)).toFixed(2);

      this.setState({
        hundredthSeconds : hundredthSeconds,
        tenthSeconds : tenthSeconds,
        seconds : seconds,
        minutes: minutes,
        message: totalTimeInSeconds + ' seconds'
      });
    }.bind(this), 10);
  } 

  componentDidUpdate() {
    // On game reset
    if (!this.props.singleGame) {
      if (this.state.minutes || this.state.seconds || this.state.tenthSeconds) {
        this.setState({
          minutes: 0,
          seconds: 0,
          tenthSeconds: 0,
          message: '0.00',
          timerOn: false
        });
      }
    }

    // On game end, stop timer and send time elapsed to Singleplayer
    if (this.props.singleGame === 'ENDED_GAME' && this.state.timerOn) {
      clearInterval(this.intervalID);
      this.setState({timerOn : false});
      // this.props.saveTimeElapsed(this.state.tenthSeconds, this.state.seconds, this.state.minutes);
      var time = {
        hundredthSeconds: this.state.hundredthSeconds,
        tenthSeconds: this.state.tenthSeconds,
        seconds: this.state.seconds,
        minutes: this.state.minutes
      }
      this.props.updateElapsedTime(time);

    }
    // On game start, start if not already running
    if (this.props.singleGame === 'STARTED_GAME' && !this.state.timerOn) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    this.props.leavePage();
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className="text-center no-top-margin">{this.state.message}</h2>
        </div>
        <StartButton />
        <CountdownTimer />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    singleGame: state.singleGame
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ leavePage: leavePage, updateElapsedTime: updateElapsedTime }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);