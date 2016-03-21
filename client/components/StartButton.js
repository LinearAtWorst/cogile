import React, { PropTypes, Component } from 'react';

class StartButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Start!',
      buttonType: 'btn btn-primary btn-lg center-block',
      countingDown: false,
      buttonDisabled: false,
      handleMultiCalled: false
    }
  };

  handleClick() {
    console.log('L26: StartButton.js : handleClick');
    this.setState({
      countingDown: true,
      text: 'Go!',
      buttonType: 'btn btn-success btn-lg center-block',
      buttonDisabled: true
    });
    this.props.startCountdown();
  }

  render() {
    if (!this.props.showButton) {
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

export default StartButton;