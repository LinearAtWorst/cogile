import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 1,
      message: 'Click the start button to begin!'
    }
  };

  componentDidUpdate() {
    // will only run once because of secondsElapsed condition
    if (this.props.gameFinished && this.state.secondsElapsed !== 'finished') {
      this.resetTimer();
    }
  }

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

    this.props.gameStart();

    this.incrementer = setInterval(function() {
      this.setState({
        secondsElapsed: (this.state.secondsElapsed + 1),
        message: 'Time Elapsed: ' + this.getMinutes() + ' Minutes & ' + this.getSeconds() + ' Seconds!'
      });
    }.bind(this), 1000);
  }

  startNewTimer() {
    this.setState({
      secondsElapsed: 1,
      message: 'Click the start button to begin!'
    });

    this.props.startTimer();
    clearInterval(this.incrementer);
  }

  resetTimer() {
    this.setState({
      secondsElapsed: 'finished'
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

    clearInterval(this.incrementer);
  }

  render() {
    return (
      <div className="container">
      <div className="row">
        <h1 className="text-center">{this.state.message}</h1>
        </div>
        <div className="row">
        {(this.state.secondsElapsed === 1)
        ? <center>
        <button type="button" onClick={this.startTimer.bind(this)} className="btn btn-success">START</button>
        </center>
        : null
        }

        {(this.state.secondsElapsed !== 'finished' && this.state.secondsElapsed > 1)
        ? <center>
        <button type="button" onClick={this.resetTimer.bind(this)} className="btn btn-primary">FINISH</button>
        </center>
        : null
        }

        {(this.state.secondsElapsed === 'finished')
        ? <center>
        <button type="button" onClick={this.startNewTimer.bind(this)} className="btn btn-warning">RETRY</button>
        </center>
        : null
        }
        </div>
        <br />
      </div>
    );
  }
};

export default Timer;
