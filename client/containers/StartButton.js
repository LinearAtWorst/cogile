import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { startCountdown } from '../actions/index';
import { bindActionCreators } from 'redux';

class StartButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Start!',
      buttonType: 'btn btn-raised btn-primary',
      buttonDisabled: false,
      handleMultiCalled: false
    }
  };

  handleClick() {
    if (!this.state.buttonDisabled) {
      this.props.startCountdown();

      this.setState({
        text: 'Go!',
        buttonType: 'btn btn-raised btn-success',
        buttonDisabled: true
      });
    }
  }

  componentDidUpdate() {
    // Reset the button if level changes
    if (!this.props.singleGame && this.state.buttonDisabled && this.props.countingDown !== 'START_COUNTDOWN') {
      this.setState({
        text: 'Start!',
        buttonType: 'btn btn-raised btn-primary',
        buttonDisabled: false,
        handleMultiCalled: false
      });
    }
  }

  render() {
    if (this.props.countingDown === 'START_COUNTDOWN') {
      return null;
    }

    return (
      <div className="row no-height text-center" id="start-btn-container">
        <button
          id="start-btn"
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
    singleGame: state.singleGame,
    countingDown: state.countingDown
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({startCountdown: startCountdown}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StartButton)
