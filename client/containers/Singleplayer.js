import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLevel, getListOfPrompts, changeLanguage } from '../actions/index';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import CodeEditor from './CodeEditor';
import CodePrompt from '../components/CodePrompt';
import CodeGhost from './CodeGhost';
import Timer from './Timer';
import levenshtein from './../lib/levenshtein';
import ProgressBar from './ProgressBar';
import LevelDisplay from '../components/LevelDisplay';
import LevelSelect from './LevelSelect';
import LanguageSelect from './LanguageSelect';


class Singleplayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      puzzleName: '00-forloop',
      currentPuzzle: 'Error loading puzzle.  Please refresh or rejoin the game.',
      minifiedPuzzle: 'N/A',
      gameFinished: false,
      progress: 0,
      ghostProgress: 0,
      recordUsername: '',
      currentLanguage: 'js'
    };
  };

  componentDidUpdate() {
    if (this.props.currentLevel) {

      if (this.state.puzzleName !== this.props.currentLevel.currentLevel) {
        axios.get('api/getPrompt/?puzzleName=' + this.props.currentLevel.currentLevel + '&lang=' + (this.props.params.lang || this.props.currentLanguage.language))
          .then(function(res) {
            var data = res.data;
            var minifiedPuzzle = data.replace(/\s/g,'');

            this.setState({
              puzzleName: this.props.currentLevel.currentLevel,
              currentPuzzle: data,
              minifiedPuzzle: minifiedPuzzle,
              progress: 0,
              ghostProgress: 0
            });

          }.bind(this));
      }
    }

    // Checks game victory when time is different from previously recorded win time
    if (this.props.gameTime && this.props.gameTime !== this.prevTime) {
      this.endingAlert();
      this.prevTime = this.props.gameTime;
    }
  }

  componentWillMount() {
    $.material.init();

    if (this.props.params.puzzleName) {
      axios.get('api/getPrompt/?puzzleName=' + this.props.params.puzzleName + '&lang=' + this.props.params.lang)
        .then(function(res) {
          var data = res.data;
          var minifiedPuzzle = data.replace(/\s/g,'');

          this.props.changeLevel({'currentLevel': this.props.params.puzzleName})

          this.setState({
            puzzleName: this.props.params.puzzleName,
            currentPuzzle: data,
            minifiedPuzzle: minifiedPuzzle
          });
        }.bind(this));
    } else {
      axios.get('api/getPrompt')
        .then(function(res) {
          var data = res.data;
          var minifiedPuzzle = data.replace(/\s/g,'');

          this.props.changeLevel({'currentLevel': '00-forloop'})

          this.setState({
            puzzleName: '00-forloop',
            currentPuzzle: data,
            minifiedPuzzle: minifiedPuzzle
          });
        }.bind(this));
    }

    if (this.props.currentLanguage !== this.state.currentLanguage) {
      this.props.changeLanguage({language: this.props.params.lang})
      this.setState({currentLanguage: this.props.params.lang});
    }

    axios.get('api/getAllPrompts').then(function(res) {
      var list = res.data;
      this.props.getListOfPrompts({prompts: list});
    }.bind(this));
  };

  calculateProgress(playerCode, isGhostReplay) {
    if (playerCode === "") {
      return;
    }
    var totalChars = this.state.minifiedPuzzle.length;
    var distance = levenshtein(this.state.minifiedPuzzle, playerCode);

    // Calculate percent completed.  99% is complete because bar starts with 1%
    var percentCompleted = Math.floor(((totalChars - distance) / totalChars) * 99);

    if (isGhostReplay) {
      this.setState({
        ghostProgress: percentCompleted
      });
    } else {
      this.setState({
        progress: percentCompleted
      });
    }
  };
   
  endingAlert() {
    let highScoreObj = this.props.newHighScore
    let title = '';
    let html = '';
    let minutes = this.props.gameTime.minutes;
    let seconds = this.props.gameTime.seconds;
    let tenthSeconds = this.props.gameTime.tenthSeconds;
    let yourTime = (minutes*60 + seconds + tenthSeconds/10).toFixed(1);
    let bestTime = (highScoreObj.oldReplayDuration / 1000).toFixed(1);
    let bestTimeString = '<h4>Best Time: ' + bestTime + ' seconds</h4>';

    if (bestTime === 'NaN') {
      bestTimeString = '<br>';
    } 

    function successMessage() {
      let messages = ['Sweet!', 'Awesome!', 'So Nimble!', 'Amazing', 'Great!', 'Nice!'];
      let randomIndex = Math.floor(Math.random() * messages.length);

      return messages[randomIndex];
    } 

    // Set title and message for sweet alert
    if (highScoreObj.newHighScore && highScoreObj.loggedIn) {
      title = successMessage();
      html = '<h4>Your Time: ' + yourTime + ' seconds</h4>' + bestTimeString +
            'You set the new record! Your replay has been saved as the new leader.';
    } else if (highScoreObj.newHighScore && !highScoreObj.loggedIn) {
      title = successMessage();
      html = '<h4>Your Time: ' + yourTime + ' seconds</h4>' + bestTimeString +
            'You beat the high score!<br>Unfortunately, you need to be logged in so we can store your high score. Log in and try again!';
    } else if (!highScoreObj.newHighScore && highScoreObj.loggedIn) {
      title = successMessage();
      html = '<h4>Your Time: ' + yourTime + ' seconds</h4>' + bestTimeString +
            'You completed the level! Can you beat the best time?';
    } else if (!highScoreObj.newHighScore && !highScoreObj.loggedIn) {
      title = successMessage();
      html = '<h4>Your Time: ' + yourTime + ' seconds</h4>' + bestTimeString +
            'You completed the level!<br>Make sure to log in and keep practicing to beat the record.';
    }

    // New Record was Achieved
    swal({
        title: title,
        html: html,
        showCancelButton: true,
        confirmButtonText: 'Try Again?',
        cancelButtonText: 'Go Forward',
        confirmButtonClass: 'teal-btn btn',
        cancelButtonClass: 'oj-btn btn',
        buttonsStyling: false,
        closeOnConfirm: true,
        closeOnCancel: true
      },
      function(isConfirm) {
        if (isConfirm === true) {
          location.reload();
          this.props.changeLevel({'currentLevel': null});
          this.props.changeLevel({'currentLevel': this.props.currentLevel.currentLevel});
        } else if (isConfirm === false) {
          // Find index of current level
          console.log(this.props.listOfPrompts);

          let languageString = this.props.currentLanguage.language + 'Files';
          let promptsArray = this.props.listOfPrompts.prompts[languageString];
          console.log(promptsArray);

          let indexOfCurrLevel = promptsArray.indexOf(this.props.currentLevel.currentLevel);
          // Advance to next level
          if (indexOfCurrLevel !== promptsArray.length - 1) {
            indexOfCurrLevel++;
            // this.props.changeLevel({'currentLevel': null});
            // this.props.changeLevel({'currentLevel': this.props.listOfPrompts.prompts[indexOfCurrLevel]});
            browserHistory.push('/#/singleplayer/' + this.props.currentLanguage.language + '/' + promptsArray[indexOfCurrLevel]);
            location.reload();
          }
        } else {
          // outside click, isConfirm is undefinded
        }
      }.bind(this))
  }

  fetchRecordUsername(username) {
    this.setState({recordUsername: username});
  }

  render() {
    var recordName = 'Record - '.concat(this.state.recordUsername);

    return (
      <div>
        <Timer />
        <LanguageSelect />

        <div className="container col-sm-11 no-padding" id="level-select">
          <LevelSelect puzzleName={this.state.puzzleName} />
        </div>

        <div className="col-sm-10 col-sm-offset-1"><h5><b>Copy this...</b></h5></div>
        <CodePrompt
          puzzle={this.state.currentPuzzle}
          currentLanguage={this.props.currentLanguage} />
        <div className="col-sm-10 col-sm-offset-1 no-padding">
          <div className="col-sm-6"><h5><b>Type here...  </b></h5></div>
          <div className="col-sm-6"><h5><b>Best Time</b></h5></div>
          <CodeEditor
            puzzle={this.state.currentPuzzle}
            minifiedPuzzle={this.state.minifiedPuzzle} 
            calculateProgress={this.calculateProgress.bind(this)} />            
          <CodeGhost minifiedPuzzle={this.state.minifiedPuzzle}
            calculateProgress={this.calculateProgress.bind(this)}
            fetchRecordUsername={this.fetchRecordUsername.bind(this)}
            currentPuzzle={this.state.currentPuzzle} />
        </div>

        <div className="col-sm-10 col-sm-offset-1 no-padding">
          <ProgressBar percentComplete={this.state.progress} color="#009686" text="You"/>
          <ProgressBar percentComplete={this.state.ghostProgress} color="#ffa25e" text={recordName} />
        </div>
        <div className="footer"></div>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    singleGame: state.singleGame,
    currentLevel: state.currentLevel,
    gameTime: state.gameTime,
    newHighScore: state.newHighScore,
    listOfPrompts: state.listOfPrompts,
    currentLanguage: state.currentLanguage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeLevel: changeLevel, getListOfPrompts: getListOfPrompts, changeLanguage: changeLanguage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Singleplayer)
