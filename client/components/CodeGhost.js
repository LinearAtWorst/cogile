import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { syncPlayersStatuses, getUsername } from '../actions/index';
import { bindActionCreators } from 'redux';
import levenshtein from './../lib/levenshtein';
import axios from 'axios';
import helperFunctions from '../utils/helperFunctions';

class CodeGhost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLevel: null,
      replayStarted : false
    };

    this.highScoreUser = '';
  }

  static propTypes = {
  };

  static defaultProps = {
  };

  componentDidMount() {
    this.record = {};
    
    if (helperFunctions.isLoggedIn()) {
      this.username = helperFunctions.getUsername().username;
    } else {
      this.username = 'guest';
    }

    this.pendingGetRequest = false;

    this.editor = ace.edit('codeGhost');
    this.editor.setShowPrintMargin(false);
    this.editor.setOptions({
      fontSize: '11pt',
      minLines: 12,
      maxLines: 12,
      dragEnabled: false
    });
    this.editor.setTheme("ace/theme/twilight");
    this.editor.getSession().setMode("ace/mode/javascript");
    this.editor.setReadOnly(true);
    this.editor.$blockScrolling = Infinity;
    
    // Disables Selection of Text to Prevent Copy/Paste
    // Comment out for development purposes
    this.editor.on('changeSelection', function(e) {
      this.editor.selection.setSelectionRange({
        start: {
          row: 0,
          column: 0
        },
        end: {
          row: 0,
          column: 0
        }
      });
    }.bind(this));

    this.editor.getSession().on("change", function(e) {
      var code = this.editor.getSession().getValue();
      var highScoreProgress = this.calculatePercent(code);

      var highScoreUser = this.highScoreUser;
      var tempPlayersStatuses = this.props.playersStatuses;
      tempPlayersStatuses[highScoreUser][0] = highScoreProgress;

      this.props.syncPlayersStatuses(tempPlayersStatuses);
    }.bind(this)); 
  }

  // Plays back replay stored in this.record on game start
  startGhostReplay() {

    this.playbackClosure = function(value) {
      return function() {
        this.editor.setValue(value);
      }.bind(this);
    }.bind(this);
    
    var mark = null;

    for (var timeStamp in this.record) {
      if (mark) {
        var timeout = timeStamp - mark;
      } else {
        var timeout = 0;
        mark = timeStamp;
      }

      setTimeout(this.playbackClosure(this.record[timeStamp]), timeout);
    }
  }

  componentDidUpdate() {

    if (Object.keys(this.record).length === 0 || this.props.currentLevel.currentLevel !== this.previousLevel && !this.pendingGetRequest) {
      this.pendingGetRequest = true;
      axios.get('api/getHighScore/?promptName=' + this.props.currentLevel.currentLevel)
        .then(function(res) {
          if (res.data !== '') {
            this.record = {};
            this.record = JSON.parse(res.data.recording).recording;

            // grab the highScoreUser and sync his/her
            var highScoreUser = res.data.username + '_[TopScore]';
            this.highScoreUser = highScoreUser;

            var tempPlayersStatuses = this.props.playersStatuses;
            var thisUser = 'guest';
            tempPlayersStatuses[thisUser] = [0, '4CAF50'];
            tempPlayersStatuses[highScoreUser] = [0, 'F44336']

            this.props.syncPlayersStatuses(tempPlayersStatuses);

          } else {
            this.record = {
              recording: {
                '1': 'No replay loaded'
              },
              duration: 999999999999
            };

            var tempPlayersStatuses = this.props.playersStatuses;
            var thisUser = this.username;
            tempPlayersStatuses[thisUser] = [0, '4CAF50'];

            this.props.syncPlayersStatuses(tempPlayersStatuses);
          }
          this.pendingGetRequest = false;
          this.previousLevel = this.props.currentLevel.currentLevel;
        }.bind(this));

    }

    // On game start, start the ghost replay
    if (this.props.singleGame === 'STARTED_GAME' && !this.state.replayStarted) {
      this.startGhostReplay();
      this.setState({
        replayStarted: true
      });
    } else if (this.props.singleGame === null && this.state.replayStarted) { // If game was reset
      this.editor.setValue('');

      this.setState({
        replayStarted: false
      });

      // Clears all settimeouts if any still exist
      var id = window.setTimeout(function() {}, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    }
  }

  calculatePercent(playerCode) {
    // typed code is passed in, and percent completed is calculated and returned
    var miniCode = playerCode.replace(/\s/g,'');
    var totalChars = this.props.minifiedPuzzle.length;
    var distance = levenshtein(this.props.minifiedPuzzle, miniCode);

    var percentCompleted = Math.floor(((totalChars - distance) / totalChars) * 100);
    return percentCompleted;
  };

  render() {
    const style = {fontSize: '14px !important', border: '5px solid #181818'};

    return React.DOM.div({
      id: 'codeGhost',
      style: style,
      className: 'col-sm-6'
    });
  }
}

function mapStateToProps(state) {
  return {
    singleGame: state.singleGame,
    currentLevel: state.currentLevel,
    playersStatuses: state.playersStatuses
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUsername: getUsername,
    syncPlayersStatuses: syncPlayersStatuses
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeGhost);
