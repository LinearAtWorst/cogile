import React, { PropTypes, Component } from 'react';
import ReactCountdownClock from 'react-countdown-clock';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    if (this.props.countingDown === false) {
      return null;
    }

    return (
      <div className="row text-center">
        <ReactCountdownClock seconds={3} color="#55acee" alpha={1} size={53} onComplete={this.props.onCountdownFinish} />
      </div>
    );
  }
}

export default CountdownTimer;