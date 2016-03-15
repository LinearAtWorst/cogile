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
    $.get('api/getPrompt', function(data) {
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
        <AceEditor puzzle={this.state.currentPuzzle} />
        <CodePrompt puzzle={this.state.currentPuzzle} />
      </div>
    )
  }
}

export default Home;
