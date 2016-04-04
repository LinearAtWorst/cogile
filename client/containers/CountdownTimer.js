import React, { PropTypes, Component } from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import { connect } from 'react-redux';
import { startGame } from '../actions/index';
import { bindActionCreators } from 'redux';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    if (this.props.countingDown !== 'START_COUNTDOWN') {
      return null;
    }

    return (
      <div className="row text-center no-height">
        <ReactCountdownClock
          seconds={3}
          color="#304B78"
          alpha={1}
          size={53}
          onComplete={this.props.startGame} />
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
  return bindActionCreators({startGame: startGame}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CountdownTimer);