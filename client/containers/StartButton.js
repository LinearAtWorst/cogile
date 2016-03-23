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
    console.log('L26: StartButton.js : handleClick');
    
    if (!this.state.buttonDisabled) {
      this.props.startCountdown();

      this.setState({
        text: 'Go!',
        buttonType: 'btn btn-raised btn-success',
        buttonDisabled: true
      });
    }
  }

  render() {
    if (this.props.countingDown === 'START_COUNTDOWN') {
      return null;
    }

    return (
      <div className="row" id="start-btn-container">
        <button
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

export default connect(mapStateToProps, mapDispatchToProps)(StartButton)