import React, { Component } from 'react';
import LandingPageInfoBox from './LandingPageInfoBox';

class LandingPage extends Component {

  componentWillMount() {
    this.content  = {
      boxOneTitle: 'Learning By Typing',
      boxOneText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu placerat libero, a commodo ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus maximus ultrices rutrum. Donec eu nunc a elit sagittis interdum. Nunc sed turpis mi.',
      boxTwoTitle: 'Multiplayer Mode',
      boxTwoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu placerat libero, a commodo ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus maximus ultrices rutrum. Donec eu nunc a elit sagittis interdum. Nunc sed turpis mi.',
      boxThreeTitle: 'About',
      boxThreeText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu placerat libero, a commodo ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus maximus ultrices rutrum. Donec eu nunc a elit sagittis interdum. Nunc sed turpis mi.',
      boxFourTitle: 'JS, Python, and More!',
      boxFourText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu placerat libero, a commodo ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus maximus ultrices rutrum. Donec eu nunc a elit sagittis interdum. Nunc sed turpis mi.'
    };
  }


  render() {
    return (
      <div>
        <h1 className="text-center tagline">How fast can you code?</h1>
        <div className="row">
            <div className="col-sm-4 col-sm-offset-4" id="landingVideo">Cool video here</div>
        </div>
        <div className="container-fluid">
          <div className="row">
              <div className="col-sm-12 text-center">
                <a href="/#/singleplayer" className="btn btn-raised btn-primary landing-btn">Start Now!</a>
                <a href="/#/multiplayer" className="btn btn-raised btn-primary landing-btn">Challenge a Friend</a>
              </div>
          </div>
        </div>
        <div className="container-fluid landing-info-container">
          <div className="row">
              <div className="col-sm-1"></div>
              <LandingPageInfoBox title={this.content.boxOneTitle} text={this.content.boxOneText} />
              <div className="col-sm-2"></div>
              <LandingPageInfoBox title={this.content.boxTwoTitle} text={this.content.boxTwoText} />
              <div className="col-sm-1"></div>
          </div>
          <div className="row">
              <div className="col-sm-1"></div>
              <LandingPageInfoBox title={this.content.boxThreeTitle} text={this.content.boxThreeText} />
              <div className="col-sm-2"></div>
              <LandingPageInfoBox title={this.content.boxFourTitle} text={this.content.boxFourText} />
              <div className="col-sm-1"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
