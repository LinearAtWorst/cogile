import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { storeGameId, getUsername } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, hashHistory, IndexRoute, useRouterHistory } from 'react-router';
import LandingPageInfoBox from '../components/LandingPageInfoBox';

class LandingPageMulti extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor() {
    super();

    this.state = {
      roomId: ''
    };

  };

  componentWillMount() {
    this.roomcode = "/#/multigame/" + Math.floor((Math.random()*100)+100);
  }

  changeRoomId(room) {
    this.setState({
      roomId: room.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.context.router.push("/multigame/" + this.state.roomId);
  }

  render() {
    return (
      <div>
      <h1 className="text-center tagline">Welcome to Multiplayer! </h1>
      <p className="text-center">Here you can join an existing game or make your own game and invite friends.</p>
      <div className="container-fluid">
          <div className="row">
              <div className="col-sm-12 text-center">
              <center><form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group label-floating">
                {/*<label htmlFor="roomId" className="control-label">Room ID</label>*/}
                  <input type="text" id="roomId" className="form-control text-center" value={this.state.roomId} placeholder="Input room ID here." onChange={this.changeRoomId.bind(this)} />
                </div>
                </form>
                <a href={"/#/multigame/" + this.state.roomId} className="btn btn-raised btn-primary landing-btn">Join Game</a>
                </center>
                <h6 className="text-center"><strong>OR</strong></h6>
                <a href={this.roomcode} className="btn btn-raised btn-primary landing-btn">Start New Game</a>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    savedGame: state.savedGame,
    SavedUsername: state.SavedUsername
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    storeGameId: storeGameId,
    getUsername: getUsername
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageMulti);
