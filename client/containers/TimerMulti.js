import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CountdownTimerMulti from './CountdownTimerMulti';
import StartButtonMulti from './StartButtonMulti';
import { endGame, leavePage, updateElapsedTime } from '../actions/index';

class TimerMulti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hundrethSeconds: 0,
      tenthSeconds: 0,
      seconds: 0,
      minutes: 0,
      message: 'Click the start button to begin!',
      timerOn: false,
      winner: ''
    }
  };

  startTimer() {
    this.setState({
      timerOn: true,
      message: '0.00'
    });

    this.intervalID = setInterval(function() {
      var hundrethSeconds = this.state.hundrethSeconds + 1;
      var tenthSeconds = this.state.tenthSeconds;
      var seconds = this.state.seconds;
      var minutes = this.state.minutes;

      if (hundrethSeconds > 9) {
        tenthSeconds++;
        hundrethSeconds = 0;
      }

      if (tenthSeconds > 9) {
        seconds++;
        tenthSeconds = 0;
      }

      if (seconds > 59) {
        minutes++;
        seconds = 0;
      }

      var totalTimeInSeconds = ((minutes * 60) + seconds + (tenthSeconds / 10) + (hundrethSeconds / 100)).toFixed(2);

      var time = {
        hundrethSeconds: hundrethSeconds,
        tenthSeconds: tenthSeconds,
        seconds: seconds,
        minutes: minutes
      };

      // calling updateElapsedTime action to the MultiTimerReducer
      this.props.updateElapsedTime(time);

      this.setState({
        hundrethSeconds : hundrethSeconds,
        tenthSeconds : tenthSeconds,
        seconds : seconds,
        minutes: minutes,
        message: totalTimeInSeconds + ' seconds'
      });
    }.bind(this), 10);
  };

  componentDidUpdate() {
    // On game end, stop timer 
    if (this.props.multiTimer === 'STOP_TIMER') {
      clearInterval(this.intervalID);
    }

    // On game start, start if not already running
    if (this.props.multiGameState === 'STARTED_GAME' && !this.state.timerOn) {
      this.startTimer();
    }

    // if someone leaves page, stop the timer
    if (this.props.multiGameState === null) {
      clearInterval(this.intervalID);
    }
  };

  componentWillUnmount() {
    clearInterval(this.intervalID);
    this.props.leavePage();
  };
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className="text-center">{this.state.message}</h2>
        </div>
        <StartButtonMulti socket={this.props.socket} />
        <CountdownTimerMulti />
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    multiGameState: state.multiGameState,
    multiTimer: state.multiTimer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ leavePage: leavePage, endGame: endGame, updateElapsedTime: updateElapsedTime }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerMulti);