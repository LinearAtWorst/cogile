import React, { Component } from 'react';
import AceEditor from './AceEditor';
import CodePrompt from './CodePrompt';
import Timer from './Timer';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentPuzzle: ''
    };
  }

  componentWillMount() {
    $.get('api/getPuzzle', function(data) {
      this.setState({
        currentPuzzle: data
      });
      console.log('Setting state as puzzle : ', data);
    }.bind(this));
  }

  render() {
    console.log('Home Render called');
    return (
      <div>
        <Timer />
        <AceEditor />
        <CodePrompt puzzle={this.state.currentPuzzle} />
      </div>
    )
  }
}

export default Home;
