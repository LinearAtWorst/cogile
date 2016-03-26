import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeGameId, getUsername } from '../actions/index';
import { bindActionCreators } from 'redux';
import LandingPageInfoBox from '../components/LandingPageInfoBox';

class LandingPageMulti extends Component {
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

  render() {
    return (
      <div>
        <h1 className="text-center tagline">How fast can you join?</h1>
        <div className="container-fluid">
          <div className="row">
              <div className="col-sm-12 text-center">
              <a href={this.roomcode} className="btn btn-raised btn-primary landing-btn">Start New Game</a>
              <form className="form">
              <div className="form-group label-floating">
                <label htmlFor="roomId" className="control-label">Room ID</label>
                  <input type="text" id="roomId" className="form-control" value={this.state.roomId} onChange={this.changeRoomId.bind(this)} />
                </div>
                <a href={"/#/multigame/" + this.state.roomId} type="submit" className="btn btn-raised btn-primary landing-btn">Join Game</a>
                </form>
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
