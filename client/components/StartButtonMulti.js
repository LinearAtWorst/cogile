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

  componentDidUpdate() {
    // console.log('inside start button compWillUpdate, checking this.props.startMultiCD: ', this.props.startMultiCountdown);

    if (this.props.multiGameStarted && !this.state.handleMultiCalled && !this.state.countingDown) {
      console.log('inside startButton compDidUpdate, calling handleMulti()');
      this.handleMulti();
    }
  }

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

  handleMulti() {
    console.log('inside startbutton, calling handleMulti');
    this.setState({
      countingDown: true,
      text: 'Go!',
      buttonType: 'btn btn-success btn-lg center-block',
      buttonDisabled: true,
      handleMultiCalled: true
    });
    this.props.startMultiCountdown();
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