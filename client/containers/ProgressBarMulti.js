import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { leavePage } from '../actions/index';
import { bindActionCreators } from 'redux';
import underscore from 'underscore';

class ProgressBarMulti extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playersProgress: {}
    }
  };

  static propTypes = {
    percentComplete: PropTypes.number
  };

  static defaultProps = {
    percentComplete: 0
  };

  componentWillUnmount() {
    this.props.leavePage();
  }

  renderBars() {
    return underscore.map(this.props.multiGameProgress.store, function(player, key) {
      return (

        <div
          key={key} >
          {/* <div className="progress-fill" style={{width: player.playerPercent + '%'}}> */}
          {/*</div> */ }
          {player[0]}
        </div>
      );
    }.bind(this));
  }

  render() {
    return (
      <div>
        { this.renderBars() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    multiGameProgress: state.multiGameProgress
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {leavePage: leavePage} , dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBarMulti);