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

  componentDidUpdate() {
    // Listen for a 'multigame start' event from socket
    if (this.props.countingDown !== 'START_COUNTDOWN') {
      this.props.socket.on('multigame start', function(value) {
        this.startGameFromSocket();
      }.bind(this));
    }
  };

  handleClick() {
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