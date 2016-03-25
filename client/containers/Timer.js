import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CountdownTimer from './CountdownTimer';
import StartButton from './StartButton';
import { leavePage } from '../actions/index';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        message: minutes + ':' + seconds + '.' + tenthSeconds
      });
    }.bind(this), 100);
  } 

  componentDidUpdate() {
    // On game reset
    if (!this.props.singleGame) {
      if (this.state.minutes || this.state.seconds || this.state.tenthSeconds) {
        this.setState({
          minutes: 0,
          seconds: 0,
          tenthSeconds: 0,
          message: '0:0.0',
          timerOn: false
        });
      }
    }

    // On game end, stop timer and send time elapsed to Singleplayer
    if (this.props.singleGame === 'ENDED_GAME' && this.state.timerOn) {
      clearInterval(this.intervalID);
      this.setState({timerOn : false});
      this.props.saveTimeElapsed(this.state.tenthSeconds, this.state.seconds, this.state.minutes);
    }
    // On game start, start if not already running
    if (this.props.singleGame === 'STARTED_GAME' && !this.state.timerOn) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.props.leavePage();
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className="text-center">{this.state.message}</h2>
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
  return bindActionCreators({ leavePage: leavePage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);