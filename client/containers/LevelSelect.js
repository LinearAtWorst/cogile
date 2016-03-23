import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { startCountdown } from '../actions/index';
import { bindActionCreators } from 'redux';

class LevelSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  };

  componentWillMount() {
    console.log('Applying dropdown');
    $('.select').dropdown({ 'autoinit' : '.select' });
  };

  render() {
    return (
      <a data-target='#' className='btn btn-raised dropdown-toggle' data-toggle='dropdown'>
        <ul className='dropdown-menu'>
          <li>Test</li>
          <li>Test2</li>
          <li>Test3</li>
        </ul>
        LevelSelect
      </a>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelSelect)