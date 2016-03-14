import React from 'react';
import AceEditor from './AceEditor';
import CodePrompt from './CodePrompt';

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <AceEditor />
        <CodePrompt />
      </div>
    )
  }
});

module.exports = Home;