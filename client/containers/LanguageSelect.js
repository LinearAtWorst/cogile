import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { changeLanguage, changeLevel, leavePage } from '../actions/index';
import { bindActionCreators } from 'redux';

class LanguageSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: "Javascript"
    }
  };
  
  componentDidMount() {

    switch (this.props.currentLanguage.language) {
      case 'js':
        this.setState({language: 'Javascript'});
        break;
      case 'py':
        this.setState({language: 'Python'})
        break;
    }

    $("#javascript").click(function() {
      this.props.changeLanguage({language: "js"});
      this.props.changeLevel({'currentLevel': '00-forLoop'});
      this.props.leavePage();
      this.setState({language: 'Javascript'})

    }.bind(this));

    $("#python").click(function() {
      this.props.changeLanguage({language: "py"});
      this.props.changeLevel({'currentLevel': '00-helloWorld'});
      this.props.leavePage();
      this.setState({language: 'Python'})

    }.bind(this));
  }


  render() {

    return (
      <div className="col-sm-11 no-padding" id="language-display-container">
        <div className="dropdown pull-right" id="language-select">
          <button className="btn btn-raised dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">{this.state.language}
          <span className="caret"></span></button>
          <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
            <li role="presentation"><a role="menuitem" tabIndex="-1" id="javascript" href="#/singleplayer/00-forLoop/js">JavaScript</a></li>
            <li role="presentation"><a role="menuitem" tabIndex="-1" id="python" href="#/singleplayer/00-helloWorld/py">Python</a></li>
          </ul>
        </div>
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

