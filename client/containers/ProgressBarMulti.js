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
  };

  // isCurrentPlayer(player) {
  //   if(player === this.props.socket.id) {
  //     return '' + player + '(You)';
  //   } else {
  //     return player;
  //   }
  // };

  renderBars() {
    return underscore.map(this.props.playersStatuses.store, function(player, key) {
      return (
        <div className="progress-bar" key={key} >
          <div
            className="progress-fill"
            style={{
              width: player[1] + '%',
              backgroundColor: '#' + player[0],
              color: 'black'
            }}>
          {key}
          </div> 
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
    playersStatuses: state.playersStatuses
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {leavePage: leavePage} , dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBarMulti);