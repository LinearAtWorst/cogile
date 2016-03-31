import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import CodePrompt from '../components/CodePrompt';
import CodeGhost from '../components/CodeGhost';
import Timer from './Timer';
import levenshtein from './../lib/levenshtein';
import ProgressBar from '../components/ProgressBar';
import { connect } from 'react-redux';
import { changeLevel, getListOfPrompts } from '../actions/index';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import LevelSelect from './LevelSelect';
import { browserHistory } from 'react-router';

class Singleplayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      puzzleName: 'N/A',
      currentPuzzle: 'N/A',
      minifiedPuzzle: 'N/A',
      gameFinished: false,
      progress: 0,
      ghostProgress: 0
    };
  };

  componentDidUpdate() {
    if (this.props.currentLevel) {

      if (this.state.puzzleName !== this.props.currentLevel.currentLevel) {
        axios.get('api/getPrompt/?puzzleName=' + this.props.currentLevel.currentLevel)
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
      axios.get('api/getPrompt/?puzzleName=' + this.props.params.puzzleName)
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
    console.log('my minutes, seconds, tenthseconds is: ', minutes, seconds, tenthSeconds);
    let yourTime = (minutes*60 + seconds + tenthSeconds/10).toFixed(1);
    let bestTime = (highScoreObj.oldReplayDuration / 1000).toFixed(1);
    console.log(highScoreObj);

    // Set title and message for sweet alert
    if (highScoreObj.newHighScore && highScoreObj.loggedIn) {
      title = 'Woohoo!';
      html = '<h4>Your Time: ' + yourTime + ' seconds</h4>' +
            '<h4>Best Time: ' + bestTime + ' seconds</h4>' +
            'You set the new record! Your replay has been saved as the new leader.';
    } else if (highScoreObj.newHighScore && !highScoreObj.loggedIn) {
      title = 'Wow!';
      html = '<h4>Your Time: ' + yourTime + ' seconds</h4>' +
            '<h4>Best Time: ' + bestTime + ' seconds</h4>' +
            'You beat the high score!  Unfortunately, you need to be logged in so we can store your high score. Log in and try again!';
    } else if (!highScoreObj.newHighScore && highScoreObj.loggedIn) {
      title = 'Sweet!';
      html = '<h4>Your Time: ' + yourTime + ' seconds</h4>' +
            '<h4>Best Time: ' + bestTime + ' seconds</h4>' +
            'You completed the prompt! Keep practicing to beat the record.';
    } else if (!highScoreObj.newHighScore && !highScoreObj.loggedIn) {
      title = 'Great!';
      html = '<h4>Your Time: ' + yourTime + ' seconds</h4>' +
            '<h4>Best Time: ' + bestTime + ' seconds</h4>' +
            'You completed the prompt! Make sure to log in and keep practicing to beat the record.';
    }


    // New Record was Achieved
    swal({
        title: title,
        html: html,
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Onward!',
        cancelButtonText: 'Retry',
        confirmButtonClass: 'btn  btn-raised btn-success',
        cancelButtonClass: 'btn btn-raised btn-info',
        buttonsStyling: false,
        closeOnConfirm: true,
        closeOnCancel: true
      },
      function(isConfirm) {
        if (isConfirm === true) {
          // Find index of current level
          let indexOfCurrLevel = this.props.listOfPrompts.prompts.indexOf(this.props.currentLevel.currentLevel);
          // Advance to next level
          if (indexOfCurrLevel !== this.props.listOfPrompts.prompts.length - 1) {
            indexOfCurrLevel++;
            // this.props.changeLevel({'currentLevel': null});
            // this.props.changeLevel({'currentLevel': this.props.listOfPrompts.prompts[indexOfCurrLevel]});
            browserHistory.push('/#/singleplayer/' + this.props.listOfPrompts.prompts[indexOfCurrLevel]);
            location.reload();
          }

        } else if (isConfirm === false) {
          location.reload();
          console.log('Confirm false, currentlevel', this.props.currentLevel);
          this.props.changeLevel({'currentLevel': null});
          this.props.changeLevel({'currentLevel': this.props.currentLevel.currentLevel});
        } else {
          // outside click, isConfirm is undefinded
        }
      }.bind(this))
  }

  render() {
    return (
      <div>
        <Timer />
        <LevelSelect />

        <div className="col-sm-10 col-sm-offset-1"><h5><b>Copy this...</b></h5></div>
        <CodePrompt puzzle={this.state.currentPuzzle} />

        <div className="col-sm-10 col-sm-offset-1 no-padding">
          <div className="col-sm-6"><h5><b>Type here...  </b></h5></div>
          <div className="col-sm-6"><h5><b>Best Time</b></h5></div>
          <CodeEditor
            puzzle={this.state.currentPuzzle}
            minifiedPuzzle={this.state.minifiedPuzzle} 
            calculateProgress={this.calculateProgress.bind(this)} />            
          <CodeGhost minifiedPuzzle={this.state.minifiedPuzzle}
            calculateProgress={this.calculateProgress.bind(this)} />
        </div>

        <div className="col-sm-10 col-sm-offset-1 no-padding">
          <ProgressBar percentComplete={this.state.progress} color="#009686" text="You"/>
          <ProgressBar percentComplete={this.state.ghostProgress} color="#ffa25e" text="Record"/>
        </div>
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
    listOfPrompts: state.listOfPrompts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeLevel: changeLevel, getListOfPrompts: getListOfPrompts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Singleplayer)
