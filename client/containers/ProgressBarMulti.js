import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { leavePage, getUsername } from '../actions/index';
import { bindActionCreators } from 'redux';
import underscore from 'underscore';

class ProgressBarMulti extends Component {
  constructor(props) {
    super(props);
  };

  componentWillUnmount() {
    this.props.leavePage();
  };

  isCurrentPlayer(player) {
    if(player === this.props.SavedUsername) {
      return '' + player + '(You)';
    } else {
      return player;
    }
  };

  renderBars() {
    return underscore.map(this.props.multiplayerStatuses.store, function(player, key) {
      return (
        <div className="progress-bar" key={key} >
          <div
            className="progress-fill"
            style={{
              width: player[1] + '%',
              backgroundColor: '#' + player[0],
              color: 'black'
            }}>
          {this.isCurrentPlayer(key)}
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
    multiplayerStatuses: state.multiplayerStatuses,
    SavedUsername: state.SavedUsername
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {
    leavePage: leavePage,
    getUsername: getUsername
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBarMulti);