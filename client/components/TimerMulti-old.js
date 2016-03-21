// import React, { Component } from 'react';
// <<<<<<< HEAD
// import { connect } from 'react-redux';
// import { startGame, endGame } from '../actions/index';
// import { bindActionCreators } from 'redux';
// import CountdownTimer from './CountdownTimer';
// =======
// // import CountdownTimer from './CountdownTimer';
// >>>>>>> 662204f619aa851e28135bbcf0abfe74bb9632f1
// import StartButtonMulti from './StartButtonMulti';

// class TimerMulti extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tenthSeconds: 0,
//       seconds: 0,
//       minutes: 0,
//       message: 'Click the start button to begin!',
//       countingDown: false,
//       showButton: true
//     }
//   };

//   startCountdown() {
//     console.log('L23 Timer.js : StartCountdown');
//     this.setState({
//       countingDown: true,
//       showButton: false
//     });

//     //TODO: when start countdown is called, other sockets should start game too
//     if (!this.props.multiGameStarted) {
//       console.log('Creating Socket');
//       this.props.socket.emit('game start', true);
//     }
//   }

//   startMultiCountdown() {
//     if (!this.state.countingDown) {
//       console.log('inside timer.js, called startMultiCountdown()');
//       this.setState({
//         countingDown: true,
//         showButton: false
//       });
//     }
//   }

//   startTimer() {
//     this.setState({
//       countingDown: false,
//       showButton: true,
//       message: '0.0'
//     });

//     this.props.timerOn();

//     this.props.startGame();

//     this.intervalID = setInterval(function() {
//       var tenthSeconds = this.state.tenthSeconds + 1;
//       var seconds = this.state.seconds;
//       var minutes = this.state.minutes;

//       if (tenthSeconds > 9) {
//         seconds++;
//         tenthSeconds = 0;
//       }

//       if (seconds > 59) {
//         minutes++;
//         seconds = 0;
//       }

//       this.setState({
//         tenthSeconds : tenthSeconds,
//         seconds : seconds,
//         minutes: minutes,
//         message: minutes + ':' + seconds + '.' + tenthSeconds
//       });
//     }.bind(this), 100);
//   } 

//   componentDidUpdate() {
//     if (this.props.multiTimer === 'END_GAME') {
//       clearInterval(this.intervalID);
//       this.props.timerOff(this.state.tenthSeconds, this.state.seconds, this.state.minutes);
//     }

//   }

//   componentWillReceiveProps() {
    
//     // TODO: need to fix this infinite loop!
//     // if(this.props.multiGameStarted) {
//     //   console.log('inside timer componentDidMount', this.props.multiGameStarted);
//     //   this.startMultiCountdown();
//     // }
//     // this.props.multiGameStarted = false;
//   }

//   render() {
//     console.log('Rendering Timer');

//     return (
//       <div className="container">
//         <div className="row">
//           <h2 className="text-center">{this.state.message}</h2>
//         </div>
//         <StartButtonMulti
//           showButton={this.state.showButton}
//           startCountdown={this.startCountdown.bind(this)}
//           startMultiCountdown={this.startMultiCountdown.bind(this)}
//           multiGameStarted={this.props.multiGameStarted} />
//         <CountdownTimer
//           countingDown={this.state.countingDown}
//           onCountdownFinish={this.startTimer.bind(this)}
//           multiGameStarted={this.props.multiGameStarted} />
//       </div>
//     );
//   }
// };

// function mapStateToProps(state) {
//   return {
//     multiTimer: state.multiTimer
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({startGame: startGame, endGame: endGame}, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TimerMulti);
// // export default Timer;