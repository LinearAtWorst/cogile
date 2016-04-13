import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class CodePrompt extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    mode: PropTypes.string
  };

  static defaultProps = {
    mode: 'javascript',
    puzzle: 'Error'
  };

  componentDidMount() {
    this.editor = ace.edit('codePrompt');
    this.editor.setShowPrintMargin(false);
    this.editor.setOptions({
      fontSize: '10.5pt',
      minLines: 14,
      maxLines: 14,
      dragEnabled: false
    });
    this.editor.setTheme("ace/theme/tomorrow_night_bright");
    this.editor.getSession().setMode("ace/mode/javascript");
    this.editor.getSession().setUseWorker(false);
    this.editor.setReadOnly(true);
    this.editor.setHighlightActiveLine(false);
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
  }

  componentDidUpdate() {
    if (this.props.currentLanguage.language === 'py') {
      this.editor.getSession().setMode("ace/mode/python");
    } else if (this.props.currentLanguage.language === 'js') {
      this.editor.getSession().setMode("ace/mode/javascript");
    } else if (this.props.currentLanguage.language === 'go') {
      this.editor.getSession().setMode("ace/mode/golang");
    }
    
    this.editor.setValue(this.props.puzzle);
    this.editor.clearSelection();
  }

  render() {
    const style = {fontSize: '14px !important', border: '5px solid #181818'};

    return React.DOM.div({
      id: 'codePrompt',
      style: style,
      className: 'col-sm-10 col-sm-offset-1'
    });
  }
}

export default CodePrompt;