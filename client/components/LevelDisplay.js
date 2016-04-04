import React, { Component } from 'react';

class LevelDisplay extends Component {
  render() {
    return (
      <div className="col-sm-11 no-padding" id="level-display-container">
        <div className="btn btn-raised pull-right" id="level-display">
          {this.props.currentLevel}
        </div>
      </div>
    );
  }
}

export default LevelDisplay;