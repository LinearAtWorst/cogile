import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="container">
      <h1 className="about-title">Meet The Team</h1>
      <h5 className="about-minititle">[ Cogile NimbleKey Nimblr ]</h5>
      <div className="row row-spacer"></div>
      <div className="row">
      <div className="col-md-3 about-borders">
      <h3 className="about-names">Nicholas Der</h3>
      <div className="row icon-container">
      <a href="https://github.com/kiritsuzu" target="_blank"><i className="fa fa-github-square fa-5x about-icon"></i></a>
      <a href="https://www.linkedin.com/in/kiritsuzu" target="_blank"><i className="fa fa-linkedin-square fa-5x about-icon"></i></a>
      </div>
      </div>
      <div className="col-md-3 about-borders">
      <h3 className="about-names">Rick Yeh</h3>
      <div className="row icon-container">
      <a href="https://github.com/kiritsuzu" target="_blank"><i className="fa fa-github-square fa-5x about-icon"></i></a>
      <a href="https://www.linkedin.com/in/kiritsuzu" target="_blank"><i className="fa fa-linkedin-square fa-5x about-icon"></i></a>
      </div>
      </div>
      <div className="col-md-3 about-borders">
      <h3 className="about-names">Jordan Allen</h3>
      <div className="row icon-container">
      <a href="https://github.com/kiritsuzu" target="_blank"><i className="fa fa-github-square fa-5x about-icon"></i></a>
      <a href="https://www.linkedin.com/in/kiritsuzu" target="_blank"><i className="fa fa-linkedin-square fa-5x about-icon"></i></a>
      </div>
      </div>
      <div className="col-md-3 about-borders">
      <h3 className="about-names">Mark Kim</h3>
      <div className="row icon-container">
      <a href="https://github.com/kiritsuzu" target="_blank"><i className="fa fa-github-square fa-5x about-icon"></i></a>
      <a href="https://www.linkedin.com/in/kiritsuzu" target="_blank"><i className="fa fa-linkedin-square fa-5x about-icon"></i></a>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default About;
