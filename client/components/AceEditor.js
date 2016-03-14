import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

class AceEditor extends Component {
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
  };

  componentDidMount(){
    const node = ReactDOM.findDOMNode(this.refs.root);
    const editor = ace.edit(node);
    // editor.setTheme("ace/theme/clouds");
    // editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);
    editor.setOptions({minLines: 25});
    editor.setOptions({maxLines: 50});

    var that = this;

    editor.getSession().on("change", function() {
      var code = editor.getSession().getValue();
      that.setState({code});
      console.log(that.state.code);
    });
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