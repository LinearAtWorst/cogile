import React from 'react';

var Timer = React.createClass({
  getInitialState: function() {
    return {
      secondsElapsed: 1,
      message: 'Click the start button to begin!'
    };
  },

  getMinutes: function() {
    return Math.floor(this.state.secondsElapsed / 60);
  },

  getSeconds: function() {
    return (this.state.secondsElapsed % 60);
  },

  startTimer: function() {
    var startTimerState = this;
    startTimerState.setState({
      message: "Starting timer now! Let's code!"
    });

    this.incrementer = setInterval(function() {
      startTimerState.setState({
        secondsElapsed: (startTimerState.state.secondsElapsed + 1),
        message: 'Time Elapsed: ' + startTimerState.getMinutes() + ' Minutes & ' + startTimerState.getSeconds() + ' Seconds!'
      });
    }, 1000);

  },

  // stopTimer: function() {
  //   clearInterval(this.incrementer);
  // },

  resetTimer: function() {
    var resetTimerState = this;
      resetTimerState.setState({
        secondsElapsed: 0
      });

      if (this.state.secondsElapsed <= 60) {
        resetTimerState.setState({
          message: 'You took ' + ((this.state.secondsElapsed-1) % 60) + ' Seconds!'
        });
      } else {
        resetTimerState.setState({
          message: 'You took ' + Math.floor((this.state.secondsElapsed-1) / 60) + ' Minutes and ' + ((this.state.secondsElapsed-1) % 60) + ' Seconds!'
        });
      }

      clearInterval(this.incrementer);
  },

  render: function() {
    return (
      <div className="container">
      <center>
      <div className="row">
        <h1>{this.state.message}</h1>
        </div>
        <div className="row">
        <div className="col-sm-6">
        <button type="button" onClick={this.startTimer} className="btn btn-success pull-right">START</button>
        </div>
        <div className="col-sm-6">
        <button type="button" onClick={this.resetTimer} className="btn btn-primary pull-left">FINISH</button>
        </div>
        </div>
        </center>
        <br />
      </div>
    );
  }
});

module.exports = Timer;

// ES6 Version of Timer Component. WARNING: DOES NOT WORK!
// import React, { Component } from 'react';

// class Timer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {secondsElapsed: 0};
//   }
//
//   getMinutes() {
//     return Math.floor(this.state.secondsElapsed / 60);
//   }
//
//   getSeconds() {
//     return ('0' + this.state.secondsElapsed % 60).slice(-2);
//   }
//
//   startTimer() {
//     var startTimerState = this;
//
//     this.incrementer = setInterval(function() {
//       startTimerState.setState({
//         secondsElapsed: (startTimerState.state.secondsElapsed + 1)
//       });
//     }, 1000);
//
//   }
//
//   stopTimer() {
//     clearInterval(this.incrementer);
//   }
//
//   render() {
//     return (
//       <div className="container">
//         <h1>{this.getMinutes()}:{this.getSeconds()}</h1>
//         <button type="button" onClick={this.startTimer} className="btn btn-success">START</button>
//         <button type="button" onClick={this.stopTimer} className="btn btn-danger">STOP</button>
//       </div>
//     );
//   }
// }

// export default Timer;
