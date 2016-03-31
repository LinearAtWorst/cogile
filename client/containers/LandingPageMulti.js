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
      publicRoomId: '',
      privateRoomId: '',
      defaultedRoomId: true,
      randomRoom: '',
      noRoomsFound: false
    };

  };

  componentDidMount() {
    this.socket = io();

    this.socket.emit('roulette roulette', {username: this.username});

    this.socket.on('roulette success', function(data) {
      this.setState({
        randomRoom: data.room
      });
    }.bind(this));

    this.socket.on('roulette fail', function() {
      console.log('no vacant rooms found, roulette failed');
      this.setState({
        noRoomsFound: true
      });
    }.bind(this));
  }

  componentWillMount() {
    this.username = this.props.getUsername().payload;
  }

  changePrivateRoomId(room) {
    this.setState({
      privateRoomId: room.target.value,
      defaultedRoomId: false
    });
  }

  handleSubmitPrivate(e) {
    e.preventDefault();
    if (this.state.defaultedRoomId){
      this.context.router.push("/multigame/" + "P" + Math.floor((Math.random()*100)+100) + "?status=private");
    } else {
      this.context.router.push("/multigame/" + "P" +  this.state.privateRoomId + "?status=private");
    }
  }

  handleSubmitPublic(e) {
    e.preventDefault();
    if (this.state.noRoomsFound){
      this.context.router.push("/multigame/" + Math.floor((Math.random()*100)+100) + "?status=public");
    } else {
      this.context.router.push("/multigame/" + this.state.randomRoom + "?status=public");
    }
  }

  render() {
    return (
      <div>
      <h1 className="text-center tagline">Welcome to Multiplayer! </h1>
      <p className="text-center">Here you can join an existing game or make your own private game and invite friends.</p>
      <div className="container-fluid">
          <div className="row">
              <div className="col-sm-12 text-center">

              <center>
                <button type="button" onClick={this.handleSubmitPublic.bind(this)} className="btn btn-raised btn-primary landing-btn">Join Public Room</button>
              </center>

              <h2 className="text-center"><strong>--- OR ---</strong></h2>

              <center><form className="form-inline" onSubmit={this.handleSubmitPrivate.bind(this)}>
                <div className="form-group label-floating">
                  <label htmlFor="roomId" className="control-label">Room ID (Number)</label>
                    <input type="number" id="roomId" className="form-control text-center" value={this.state.privateRoomId} onChange={this.changePrivateRoomId.bind(this)} />
                  </div>
                 </form>
                <button type="button" onClick={this.handleSubmitPrivate.bind(this)} className="btn btn-raised btn-primary landing-btn">Create/Join Private Room</button>
              </center>
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
