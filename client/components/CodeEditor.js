import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class CodeEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { code: '' };
  }

  static propTypes = {
    mode: PropTypes.string,
    content: PropTypes.string,
  };

  static defaultProps = {
    mode: 'javascript',
    code: '',
    puzzle: ''
  };

  componentDidMount() {
    this.editor = ace.edit('codeEditor');
    this.editor.setShowPrintMargin(false);
    this.editor.setTheme("ace/theme/twilight");
    this.editor.setOptions({minLines: 25});
    this.editor.setOptions({maxLines: 50});
    this.editor.getSession().setMode("ace/mode/javascript");
    this.editor.getSession().setTabSize(2);

    // should lock CodeEditor to read-only until timer begins
    this.editor.setReadOnly(true);

    this.editor.getSession().on("change", function() {
      var code = this.editor.getSession().getValue();
      this.setState({code});
      
      if (code === this.props.puzzle) {
        this.props.puzzleCompleted();
      }
    }.bind(this));

    // prevents copy pasting the whole thing
    this.editor.on("paste", function(e) {
      if (e.text === this.props.puzzle) {
        var shuffled = e.text.split('').sort(function(){return 0.5-Math.random()}).join('');
        e.text = "Nice try, here's your copied text :P\n" + shuffled;
      }
    }.bind(this));
  };

  componentDidUpdate() {
    if (this.props.timerOn) {
      this.editor.setReadOnly(false);
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

export default CodeEditor;