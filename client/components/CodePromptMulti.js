import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class CodePromptMulti extends Component {
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
      fontSize: '11pt',
      minLines: 12,
      maxLines: 12,
      dragEnabled: false
    });
    this.editor.setTheme("ace/theme/tomorrow_night_bright");
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
  }

  componentDidUpdate() {
    this.editor.setValue(this.props.puzzle);
    this.editor.clearSelection();
  }

  render() {
    const style = {fontSize: '12px !important', border: '5px solid #181818'};

    return React.DOM.div({
      id: 'codePrompt',
      style: style,
      className: 'col-md-6'
    });
  }
}

export default CodePromptMulti;