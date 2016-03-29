import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { changeLevel, leavePage } from '../actions/index';
import { bindActionCreators } from 'redux';


class LevelSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  };

  componentWillUpdate() {
    if (this.props.listOfPrompts) {
      this.levels = this.props.listOfPrompts.prompts;
    }
  }

  componentDidUpdate() {
    if (this.levels) {
      for (let i = 0; i < this.levels.length ; i++) {
        $("#selectLevel" + i).unbind('click').click(function() {
          this.props.changeLevel({'currentLevel': this.levels[i]});
          this.props.leavePage();
        }.bind(this));
      }
    }
  }


  render() {
    if (this.levels) {
      var arrayOfLevels = this.levels.map(function(element, index) {
        var level = 'selectLevel' + index;
        var link = '#/singleplayer/'+ element;

        return (<li key={index} role="presentation"><a role="menuitem" tabIndex="-1" id={level} href={link}>Level {index}</a></li>)
      });
    }


    return (
      <div className="container">
        <div className="dropdown pull-right">
          <button className="btn btn-info btn-raised dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Level Select
          <span className="caret"></span></button>
          <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
            <li role="presentation"><span tabIndex="-1">JavaScript</span></li>
            <li role="presentation" className="divider"></li>
            {arrayOfLevels}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentLevel: state.currentLevel,
    listOfPrompts: state.listOfPrompts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeLevel: changeLevel, leavePage: leavePage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelSelect);