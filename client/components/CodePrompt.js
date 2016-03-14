import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class CodePrompt extends Component {
  constructor(props) {
    super(props);

    this.state = { code: 'function add2(num) {\n  return num + 2;\n};' };
  }

  static propTypes = {
    mode: PropTypes.string,
    content: PropTypes.string,
  };

  static defaultProps = {
    mode: 'javascript',
    // code: 'function add2(num) {\n  return num + 2;\n};',
  };

  componentDidMount(){
    const node = ReactDOM.findDOMNode(this.refs.root);
    const editor = ace.edit(node);
    // editor.setTheme("ace/theme/clouds");
    // editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);
    editor.setOptions({minLines: 25});
    editor.setOptions({maxLines: 50});
    console.log(editor.getSession().getValue());
  }

  render() {
    const style = {fontSize: '14px !important', border: '1px solid lightgray'};
      return (
        <div ref="root" style={style} className="col-md-6">
          {this.state.code}
        </div>
      );
  }
}

export default CodePrompt;