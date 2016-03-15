import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class CodePrompt extends Component {
  constructor(props) {
    super(props);

    // this.state = { code: 'function add2(num) {\n  return num + 2;\n};' };
  }

  static propTypes = {
    mode: PropTypes.string,
    content: PropTypes.string,
  };

  static defaultProps = {
    mode: 'javascript',
    code: 'function add2(num) {\n  return num + 2;\n};',
    puzzle: 'Error'
  };

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this.refs.root);
    const editor = ace.edit(node);
    editor.setShowPrintMargin(false);
    editor.setOptions({
      minLines: 25
    });
    editor.setOptions({
      maxLines: 50
    });
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setReadOnly(true);
    editor.setValue(this.props.puzzle);
    // console.log(editor.getSession().getValue());
  }

  render() {
    const style = {fontSize: '14px !important', border: '1px solid lightgray'};
      return (
        <div ref="root" style={style} className="col-md-6">
          {this.props.puzzle}
        </div>
      );
  }
}

export default CodePrompt;