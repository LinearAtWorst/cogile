import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { changeLanguage, changeLevel, leavePage } from '../actions/index';
import { bindActionCreators } from 'redux';


class LanguageSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  };

  componentWillUpdate() {

  }

  componentDidUpdate() {
    // if (this.levels) {
    //   for (let i = 0; i < this.levels.length ; i++) {
    //     $("#selectLevel" + i).unbind('click').click(function() {
    //       this.props.changeLevel({'currentLevel': this.levels[i]});
    //       this.props.leavePage();
    //     }.bind(this));
    //   }
    // } else { // Call set timeout to re-render component after 500ms if no data yet to fix bug
    //   setTimeout(function() {
    //     this.setState({loading: true});
    //   }.bind(this), 500);
    // }
  }

  componentDidMount() {
    console.log('ComponentDidMount : ', this.props.currentLanguage)

    $("#javascript").unbind('click').click(function() {
      this.props.changeLanguage({language: "javascript"});
      console.log('Current Language : ', this.props.currentLanguage)

    }.bind(this));
    $("#python").unbind('click').click(function() {
      // Action to change to python
      this.props.changeLanguage({language: "python"});

      console.log('Current Language : ', this.props.currentLanguage)

    }.bind(this));
  }


  render() {

    return (
        <div className="dropdown pull-right singleplayer-switch">
          <button className="btn btn-raised dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Language
          <span className="caret"></span></button>
          <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
            <li role="presentation"><a role="menuitem" tabIndex="-1" id="javascript" href="#/singleplayer/">Javascript</a></li>
            <li role="presentation"><a role="menuitem" tabIndex="-1" id="python" href="#/singleplayer/">Python</a></li>
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
  return bindActionCreators({
    changeLevel: changeLevel,
    leavePage: leavePage,
    changeLanguage: changeLanguage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect);

