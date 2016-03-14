import React, { PropTypes, Component } from 'react';

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
    const node = React.findDOMNode(this.refs.root);
    const editor = ace.edit(node);
    editor.setTheme("ace/theme/clouds");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);
    editor.setOptions({minLines: 25});
    editor.setOptions({maxLines: 50});
  }

  render() {
    const style = {fontSize: '14px !important', border: '1px solid lightgray'};
      return (
        <div ref="root" style={style}>
          {this.props.code}
        </div>
      );
  }
}

export default AceEditor;