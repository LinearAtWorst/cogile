import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class AceEditor extends Component {

  static propTypes = {
    mode: PropTypes.string,
    content: PropTypes.string,
  };

  static defaultProps = {
    mode: 'javascript',
    code: '// write your code here',
  };

  componentDidMount(){
    const node = ReactDOM.findDOMNode(this.refs.root);
    const editor = ace.edit(node);
    // editor.setTheme("ace/theme/clouds");
    // editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);
    editor.setOptions({minLines: 25});
    editor.setOptions({maxLines: 50});
  }

  render() {
    const style = {fontSize: '14px !important', border: '1px solid lightgray'};
      return (
        <div ref="root" style={style} className="col-md-6">
          {this.props.code}
        </div>
      );
  }
}

export default AceEditor;