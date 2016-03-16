import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 1,
      message: 'Click the start button to begin!'
    }
  };

  getMinutes() {
    return Math.floor(this.state.secondsElapsed / 60);
  }

  getSeconds() {
    return (this.state.secondsElapsed % 60);
  }

  startTimer() {
    this.setState({
      message: 'Starting timer now! Let\'s code!'
    });

    this.props.startTimer();

    this.incrementer = setInterval(function() {
      this.setState({
        secondsElapsed: (this.state.secondsElapsed + 1),
        message: 'Time Elapsed: ' + this.getMinutes() + ' Minutes & ' + this.getSeconds() + ' Seconds!'
      });
    }.bind(this), 1000);
  }

  resetTimer() {
    this.setState({
      secondsElapsed: 0
    });

    if (this.state.secondsElapsed <= 60) {
      this.setState({
        message: 'You took ' + ((this.state.secondsElapsed-1) % 60) + ' Seconds!'
      });
    } else {
      this.setState({
        message: 'You took ' + Math.floor((this.state.secondsElapsed-1) / 60) + ' Minutes and ' + ((this.state.secondsElapsed-1) % 60) + ' Seconds!'
      });
    }
  }

  render() {
    return (
      <div className="container">
      <center>
      <div className="row">
        <h1>{this.state.message}</h1>
        </div>
        <div className="row">
        <div className="col-sm-6">
        <button type="button" onClick={this.startTimer.bind(this)} className="btn btn-success pull-right">START</button>
        </div>
        <div className="col-sm-6">
        <button type="button" onClick={this.resetTimer.bind(this)} className="btn btn-primary pull-left">FINISH</button>
        </div>
        </div>
        </center>
        <br />
      </div>
    );
  }
};

export default Timer;
