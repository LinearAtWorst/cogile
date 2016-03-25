import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { startGame, endGame } from '../actions/index';
import { bindActionCreators } from 'redux';

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
    this.editor = ace.edit('codeEditor');
    this.editor.setShowPrintMargin(false);
    this.editor.setTheme("ace/theme/twilight");
    this.editor.getSession().setMode("ace/mode/javascript");
    this.editor.getSession().setTabSize(2);

    this.editor.setOptions({
      fontSize: '12pt',
      minLines: 15,
      maxLines: 15,
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

    this.editor.getSession().on("change", function(e) {
      var value = this.editor.getSession().getValue();
      
      // populate record object with keys of the time, and values of text value
      this.record[(new Date()).getTime()] = value;

      // strip whitepsace for win condition comparison
      var code = value.replace(/\s/g,'');
      this.props.calculateProgress(code);

      // if code matches the minified solution
      if (code === this.props.minifiedPuzzle) {
        // check elapsedTime vs. ghost's time
        // if elapsedTime < ghost's time, then save new 

        // save the replay
        localStorage.setItem(this.props.currentLevel.currentLevel, JSON.stringify(this.record));
        this.props.endGame();
        this.editor.setReadOnly(true);
      }
    }.bind(this));

    // prevents copy pasting the whole thing
    // this.editor.on("paste", function(e) {
    //   if (e.text === this.props.puzzle) {
    //     var shuffled = e.text.split('').sort(function(){return 0.5-Math.random()}).join('');
    //     e.text = "Nice try, here's your copied text :P\n" + shuffled;
    //   }
    // }.bind(this));
  };

  componentDidUpdate() {
    // if level has been changed or reset
    if (this.props.singleGame === null) {
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
    }
  }

  render() {
    const style = {fontSize: '14px !important', border: '1px solid lightgray'};
    
    return React.DOM.div({
      id: 'codeEditor',
      style: style,
      className: 'col-md-6'
    });
  }
}

function mapStateToProps(state) {
  return {
    singleGame: state.singleGame,
    currentLevel: state.currentLevel
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({startGame: startGame, endGame: endGame}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);