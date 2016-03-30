import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { leavePage } from '../actions/index';
import { bindActionCreators } from 'redux';
import underscore from 'underscore';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
  };

  static propTypes = {
    percentComplete: PropTypes.number,
    color: PropTypes.string,
    text: PropTypes.string
  };

  static defaultProps = {
    percentComplete: 0
  };

  componentWillUnmount() {
    this.props.leavePage();
  };

  render() {
    return (
      <div className="progress-bar">
        <div className="progress-fill" style={{width: this.props.percentComplete + '%', backgroundColor: this.props.color}}>
          <span className="progress-bar-name">{this.props.text}</span>
        </div>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    currentLevel: state.currentLevel,
    playersStatuses: state.playersStatuses
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {leavePage: leavePage} , dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);