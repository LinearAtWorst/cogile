import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class CodeGhost extends Component {
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
    this.editor = ace.edit('codeGhost');
    this.editor.setShowPrintMargin(false);
    this.editor.setOptions({minLines: 25});
    this.editor.setOptions({maxLines: 50});
    this.editor.setOption("dragEnabled", false)
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

    this.playbackClosure = function(value) {
      return function() {
        this.editor.setValue(value);
      }.bind(this);
    }.bind(this);

    this.record = JSON.parse(localStorage.getItem('replay'));

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

    // console.log('Local Storage is : ', this.record);
  }

  componentDidUpdate() {
    // this.editor.setValue(this.props.puzzle);
    // this.editor.clearSelection();
  }

  render() {
    const style = {fontSize: '14px !important', border: '1px solid lightgray'};

    return React.DOM.div({
      id: 'codeGhost',
      style: style,
      className: 'col-md-6'
    });
  }
}

export default CodeGhost;