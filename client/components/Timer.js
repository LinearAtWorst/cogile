import React, { Component } from 'react';
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

  render() {
    if (this.props.gameFinished) {
      clearInterval(this.intervalID);
      this.props.timerOff(this.state.tenthSeconds, this.state.seconds, this.state.minutes);
    }

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

export default Timer;