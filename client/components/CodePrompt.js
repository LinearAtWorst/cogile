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

  componentDidMount() {
    this.editor = ace.edit('codePrompt');
    this.editor.setShowPrintMargin(false);
    this.editor.setOptions({minLines: 25});
    this.editor.setOptions({maxLines: 50});
    this.editor.setTheme("ace/theme/twilight");
    this.editor.getSession().setMode("ace/mode/javascript");
    this.editor.setReadOnly(true);
  }

  componentDidUpdate() {
    this.editor.setValue(this.props.puzzle);
    // console.log(editor.getSession().getValue());
  }

  render() {
    const style = {fontSize: '14px !important', border: '1px solid lightgray'};
      // return (
      //   <div ref="root" style={style} className="col-md-6">
      //     {this.props.puzzle}
      //   </div>
      // );
    return React.DOM.div({
      id: 'codePrompt',
      style: style,
      className: 'col-md-6'
    });
  }
}

export default CodePrompt;