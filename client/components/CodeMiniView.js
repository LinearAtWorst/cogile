import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class CodeMiniView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('this key is: ', this.props.playerKey);
    this.editor = ace.edit(this.props.playerKey);
    this.editor.setShowPrintMargin(false);
    this.editor.setOptions({
      fontSize: '6pt',
      minLines: 15,
      maxLines: 15,
      dragEnabled: false
    });
    this.editor.setTheme("ace/theme/tomorrow_night");
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
    this.editor.setValue(this.props.playerCode);
  }

  render() {
    const style = {fontSize: '6px !important', border: '3px solid #181818'};

    return (
      <div className="no-padding">
        <div id={this.props.playerKey} style={style}></div>
        <p className="text-center">{this.props.playerKey}</p>
      </div>
    )
  }
}

export default CodeMiniView;
