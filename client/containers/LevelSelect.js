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
      var objectName = this.props.currentLanguage.language + 'Files';

      this.levels = this.props.listOfPrompts.prompts[objectName];
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
    } else { // Call set timeout to re-render component after 500ms if no data yet to fix bug
      setTimeout(function() {
        this.setState({loading: true});
      }.bind(this), 500);
    }
  }


  render() {
    if (this.levels) {
      var arrayOfLevels = this.levels.map(function(element, index) {
        var level = 'selectLevel' + index;
        var link = '#/singleplayer/'+ element + '/' + this.props.currentLanguage.language;
        var label = element.replace('-', '. ');

        return (<li key={index} role="presentation"><a role="menuitem" tabIndex="-1" id={level} href={link}>{label}</a></li>)
      }.bind(this));
    }

    return (
        <div className="dropdown pull-right singleplayer-switch">
          <button className="btn btn-raised dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">{this.props.puzzleName}
          <span className="caret"></span></button>
          <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
            {arrayOfLevels}
          </ul>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentLevel: state.currentLevel,
    listOfPrompts: state.listOfPrompts,
    currentLanguage: state.currentLanguage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeLevel: changeLevel, leavePage: leavePage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelSelect);