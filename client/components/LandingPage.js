import React, { Component } from 'react';
import LandingPageInfoBox from './LandingPageInfoBox';

class LandingPage extends Component {

  componentWillMount() {
    this.content  = {
      boxOneTitle: 'Learn By Typing',
      boxOneText: 'Become a faster and more efficient coder, whether you are an experienced or beginner software engineer. One way to improve is to practice writing more lines of code. Why not learn and have competitive fun at the same time?',
      boxTwoTitle: 'Race Against Your Friends',
      boxTwoText: 'Everyone loves friendly competition. We help you display your coding prowess by competing against your friends in real time. Stretch those fingers and challenge your friends!',
      boxThreeTitle: 'Grow Your Coding Vocabulary',
      boxThreeText: 'Our team believes in learning by typing and repetition. By being exposed to different code snippets, our users can learn and expand their coding vocabulary. Whether it is typing out a FizzBuzz algorithm, simple React components, or ES6 syntax, nimblecode is a fun and easy way to grow as a developer.',
      boxFourTitle: 'Code in JS, Python, and Go!',
      boxFourText: 'We are four full stack JavaScript developers, but we understand that you may have a different favorite language.  Currently we have lessons in JS, Python, and Go.  If you would like to see nimblecode support more languages, let us know!'
    };

    console.log('Copyright © 2016 nimblecode\nhttps://github.com/nimblecode/nimblecode\nMIT Licensed. Enjoy!');
  }


  render() {
    return (
      <div>
        <h1 className="text-center tagline">How fast can you code?</h1>
        <div className="row">
          <div className="col-sm-12 text-center" id="landingVideo"><img id="codingGif" src="http://nimblecode.github.io/static/nimblecode-landing-10fps.gif" /></div>
        </div>
        <div className="container-fluid">
          <div className="row">
              <div className="col-sm-12 text-center">
                <a href="/#/singleplayer/js/00-forLoop" className="btn btn-raised btn-primary landing-btn">Start Now!</a>
                <a href="/#/multiplayer" className="btn btn-raised btn-primary landing-btn">Challenge a Friend</a>
              </div>
          </div>
        </div>
        <div className="container-fluid landing-info-container landing-content">
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
        <div className="col-sm-12 text-center landing-footer">© nimblecode 2016<a href="https://github.com/nimblecode/nimblecode"><i className="fa fa-github fa-lg landing-icon"></i></a><a href="mailto:nimblecodeio@gmail.com"><i className="fa fa-envelope fa-lg landing-icon"></i></a>
        </div>
      </div>
    );
  }
}

export default LandingPage;
