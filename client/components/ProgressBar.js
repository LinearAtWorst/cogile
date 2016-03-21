import React, { PropTypes, Component } from 'react';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
  };

  static propTypes = {
    percentComplete: PropTypes.number
  };

  static defaultProps = {
    percentComplete: 0
  };

  render() {
    return (
      <div className="progress-bar">
        <div className="progress-fill" style={{width: this.props.percentComplete + '%'}}>
        </div>
      </div>
    );
  }
}

export default ProgressBar;