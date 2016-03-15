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

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.refs.root);
    const editor = ace.edit(node);
    editor.setTheme("ace/theme/chrome");
    editor.setOptions({minLines: 25});
    editor.setOptions({maxLines: 50});
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setTabSize(2);
    editor.setShowPrintMargin(false);

    var example = 'function add2(num) {\n  return num + 2;\n};';

    var that = this;

    editor.getSession().on("change", function() {
      var code = editor.getSession().getValue();
      if (code === example) {
        alert('completed!');
      }
      that.setState({code});
      console.log(that.state.code);
    });

    // prevents copy pasting the whole thing
    editor.on("paste", function(e) {
      if (e.text === example) {
        var shuffled = e.text.split('').sort(function(){return 0.5-Math.random()}).join('');
        e.text = "Nice try, here's your copied text :P\n" + shuffled;
      }
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