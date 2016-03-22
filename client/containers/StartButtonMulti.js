import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { startCountdown } from '../actions/index';
import { bindActionCreators } from 'redux';

class StartButtonMulti extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Start!',
      buttonType: 'btn btn-primary btn-lg center-block',
      buttonDisabled: false,
      handleMultiCalled: false
    }
  };

  componentDidMount() {
    console.log('inside startButtonMulti compDidMount, socket is: ', this.props.socket);
    // this.props.socketFromMulti.on('multigame start', function(value) {
    //   console.log('multigame is starting!')
    //   // this.setState({multiGameStarted: true});
    // }.bind(this));
  };

  componentDidUpdate() {
    this.props.socket.on('multigame start', function(value) {
      console.log('received "multigame start" event from socket');
      this.startGameFromSocket();
    }.bind(this));
  };

  handleClick() {
    console.log('L26: StartButton.js : handleClick');
    
    // startCountdown action
    this.props.startCountdown();

    // emit event to socket that multigame is starting
    this.props.socket.emit('game start', true);

    this.setState({
      text: 'Go!',
      buttonType: 'btn btn-success btn-lg center-block',
      buttonDisabled: true
    });
  };

  startGameFromSocket() {
    console.log('Starting game from socket event');
    // startCountdown action
    this.props.startCountdown();

    this.setState({
      text: 'Go!',
      buttonType: 'btn btn-success btn-lg center-block',
      buttonDisabled: true
    });
  };

  render() {
    if (this.props.countingDown === 'START_COUNTDOWN') {
      return null;
    }

    return (
      <div className="row" id="start-btn-container">
        <button
          disabled={this.state.buttonDisabled}
          type="button"
          onClick={this.handleClick.bind(this)}
          className={this.state.buttonType}>
          {this.state.text}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    countingDown: state.countingDown
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({startCountdown: startCountdown}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StartButtonMulti)
// export default StartButton;