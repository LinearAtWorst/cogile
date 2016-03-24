import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { changeLevel } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Router, browserHistory } from 'react-router';


class LevelSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  };

  componentWillMount() {
    // console.log('Applying dropdown');
    // $('.select').dropdown({ 'autoinit' : '.select' });
  };

  componentDidMount() {
    this.levels = [
      '01-identity',
      '02-first'
    ];

    function closure(savedIndex) {
      // console.log('this 1 : ', this);
      // console.log(this.levels);

      return function() {
        // console.log('Index : ', savedIndex);

        this.props.changeLevel({'currentLevel': this.levels[savedIndex]});
      }.bind(this);
    };

    for (var i = 0; i < 10; i++) {
      // console.log('this 3 : ', this);
      $("#selectLevel" + i).click(closure.call(this, i));

      // $("#selectLevel" + i).click(function() {
      //   console.log('this 4: ', + this);
      // }.bind(this));

    }

    $("selectLevel3").click(function() {
      browserHistory.push('/#/singleplayer');
    });
  }


  render() {
    return (
      <div className="container">
        <div className="dropdown pull-right">
          <button className="btn btn-info btn-raised dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Level Select
          <span className="caret"></span></button>
          <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
            <li role="presentation"><span tabIndex="-1">JavaScript</span></li>
            <li role="presentation" className="divider"></li>
            <li role="presentation"><a role="menuitem" tabIndex="-1" id="selectLevel0" href="#/singleplayer/01-identity">Level 1</a></li>
            <li role="presentation"><a role="menuitem" tabIndex="-1" id="selectLevel1" href="#/singleplayer/02-first">Level 2</a></li>
            <li role="presentation"><a role="menuitem" tabIndex="-1" id="selectLevel2" href="#">Level 3</a></li>
            <li role="presentation"><a role="menuitem" tabIndex="-1" id="selectLevel3" href="#">Level 4</a></li>
            <li role="presentation"><a role="menuitem" tabIndex="-1" id="selectLevel4" href="#">Level 5</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeLevel: changeLevel}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelSelect);

// return (
//   <a data-target='#' className='btn btn-raised dropdown-toggle' data-toggle='dropdown'>
//     <ul className='dropdown-menu'>
//       <li>Test</li>
//       <li>Test2</li>
//       <li>Test3</li>
//     </ul>
//     LevelSelect
//   </a>
// );