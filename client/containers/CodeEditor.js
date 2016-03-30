import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { startGame, endGame, newHighScore, getUsername, syncPlayersStatuses } from '../actions/index';
import { bindActionCreators } from 'redux';
import levenshtein from './../lib/levenshtein';
import axios from 'axios';
import helperFunctions from '../utils/helperFunctions';

class CodeEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    mode: PropTypes.string,
    puzzle: PropTypes.string,
    minifiedPuzzle: PropTypes.string
  };

  static defaultProps = {
    mode: 'javascript',
    puzzle: ''
  };

  componentDidMount() {
    // Set username if it exists
    if (helperFunctions.isLoggedIn()) {
      this.username = helperFunctions.getUsername().username;
    } else {
      this.username = 'guest';
    }

    this.editor = ace.edit('codeEditor');
    this.editor.setShowPrintMargin(false);
    this.editor.setTheme("ace/theme/twilight");
    this.editor.getSession().setMode("ace/mode/javascript");
    this.editor.getSession().setTabSize(2);

    this.editor.setOptions({
      fontSize: '11pt',
      minLines: 12,
      maxLines: 12,
      enableBasicAutocompletion: true,
      enableSnippets: false,
      enableLiveAutocompletion: false
    });

    // autocomplete tries to fire on every input
    this.editor.commands.on("afterExec", function(e) {
      if (e.command.name == "insertstring" && /^[\w.]$/.test(e.args)) {
        this.editor.execCommand("startAutocomplete")
      }
    }.bind(this));

    // should lock CodeEditor to read-only until timer begins
    this.editor.setReadOnly(true);

    // record that holds the "ghost" replay
    this.record = {};

    // On every keypress in the code editor
    this.editor.getSession().on("change", function(e) {
      var value = this.editor.getSession().getValue();
      // populate record object with keys of the time, and values of text value
      this.record[(new Date()).getTime()] = value;

      // strip whitepsace for win condition comparison
      var code = value.replace(/\s/g,'');

      this.props.calculateProgress(code);
      
      // calculate user's progress and send to ProgressBar
      // var userProgress = this.calculatePercent(value);
      // var thisUser = this.username;
      
      // var tempPlayersStatuses = this.props.playersStatuses;
      // tempPlayersStatuses[thisUser][0] = userProgress;
      // this.props.syncPlayersStatuses(tempPlayersStatuses);

      // if code matches the minified solution, trigger win condition
      if (code === this.props.minifiedPuzzle) {
        var recordingEndTime = 0;
        var recordingStartTime = 1000000000000000000;

        // find recordingEndTime and recordingStartTime
        for (var key in this.record) {
          if (parseInt(key) > recordingEndTime) {
            recordingEndTime = parseInt(key);
          }
          if (parseInt(key) < recordingStartTime) {
            recordingStartTime = parseInt(key);
          }
        }

        // Calculate duration of the current recording's duration
        var recordingDuration = recordingEndTime - recordingStartTime;

        // If a record exists for the current level
        if (this.recordHigh !== '') {

          // Grab the best replay's duration
          var oldReplayDuration = JSON.parse(this.recordHigh.recording).duration;

          // check current duration vs. ghost's duration
          // if current time < ghost's time and user is logged in, then save new record
          if (recordingDuration < oldReplayDuration) {
            if (this.username !== 'guest') {
              console.log('Beat High Score, logged in')
              // save the replay
              this.props.newHighScore({
                newHighScore: true,
                oldReplayDuration: oldReplayDuration,
                loggedIn: true
              });
              axios.post('api/setHighScore', {
                username: this.username,
                recording: JSON.stringify({
                  recording: this.record,
                  duration: recordingDuration
                }),
                puzzleName: this.props.currentLevel.currentLevel
              }).then(function(res) {
                // console.log(res);
              }.bind(this));
            // Beat high score but wasn't logged in, don't save
            } else {
              console.log('Beat High Score, was not logged in')

              this.props.newHighScore({
                newHighScore: true,
                oldReplayDuration: oldReplayDuration,
                loggedIn: false
              });
            }
          } else { // Broadcast action that no new high score was set
            if (this.username === 'guest') {
              console.log(recordingDuration)
              console.log(oldReplayDuration);
              console.log('Lost High Score, was not logged in')

              this.props.newHighScore({
                newHighScore: false,
                oldReplayDuration: oldReplayDuration,
                loggedIn: false
              });
            } else {
              console.log('Lost High Score, was  logged in')

              this.props.newHighScore({
                newHighScore: false,
                oldReplayDuration: oldReplayDuration,
                loggedIn: true
              });
            }
          }
        } else { // If there is no current high score, just set the high score automatically
          if (this.username !== 'guest') {
            this.props.newHighScore({
              newHighScore: true,
              oldReplayDuration: oldReplayDuration,
              loggedIn: true
            });

            axios.post('api/setHighScore', {
              username: this.username,
              recording: JSON.stringify({
                recording: this.record,
                duration: recordingDuration
              }),
              puzzleName: this.props.currentLevel.currentLevel
            }).then(function(res) {
              // console.log(res);
            }.bind(this));
          } else { // Else they are not logged in
            this.props.newHighScore({
              newHighScore: true,
              oldReplayDuration: oldReplayDuration,
              loggedIn: false
            });
          }
        }
        
        this.props.endGame();
        this.editor.setReadOnly(true);
      }
    }.bind(this));

    // prevents pasting
    this.editor.on("paste", function(e) {
      e.text = "";
    }.bind(this));
  };

  componentDidUpdate() {
    // if level has been changed or reset
    if (this.props.singleGame === null || this.props.currentLevel.currentLevel === null) {
      this.editor.setValue('');
      this.editor.setReadOnly(true);
    }
    // once game starts
    if (this.props.singleGame === 'STARTED_GAME') {
      // focus goes to CodeEditor and read-only disabled
      this.editor.setReadOnly(false);
      this.editor.focus();

      // start recording ghost replay when game starts
      if (Object.keys(this.record).length === 0) {
        this.record[(new Date()).getTime()] = '';
      }

      if (this.recordHigh === undefined) {
        axios.get('api/getHighScore/?promptName=' + this.props.currentLevel.currentLevel)
          .then(function(res) {
            this.recordHigh = res.data;
          }.bind(this));
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
      id: 'codeEditor',
      style: style,
      className: 'col-sm-6'
    });
  }
}

function mapStateToProps(state) {
  return {
    singleGame: state.singleGame,
    currentLevel: state.currentLevel,
    playersStatuses: state.playersStatuses,
    SavedUsername: state.SavedUsername
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startGame: startGame,
    endGame: endGame,
    newHighScore: newHighScore,
    getUsername: getUsername,
    syncPlayersStatuses: syncPlayersStatuses
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);