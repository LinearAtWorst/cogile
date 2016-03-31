import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { leavePage } from '../actions/index';
import { bindActionCreators } from 'redux';
import underscore from 'underscore';
import CodeMiniView from '../components/CodeMiniView';

class AllMiniViews extends Component {
  constructor(props) {
    super(props);
  };

  componentWillUnmount() {
    this.props.leavePage();
  };

  isCurrentPlayer(player) {
    return (player === this.props.SavedUsername);
  };

  renderMiniViews() {
    return underscore.map(this.props.multiplayerStatuses.store, function(player, key) {
      if (this.isCurrentPlayer(key)) {
        return null;
      }

      return (
        <div className="code-mini-view" key={key} >
          <CodeMiniView playerKey={key} playerCode={player[2]}/>
        </div>
      );
    }.bind(this));
  }

  render() {
    return (
      <div className="" id="mini-view-wrapper">
        { this.renderMiniViews() }
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
    leavePage: leavePage
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMiniViews);