import React, { Component } from 'react';

class AboutProfile extends Component {
  render() {
    return (
      <div className="col-md-3">
        <h3 className="about-names">{this.props.name}</h3>
        <div className="img-container"><img className="about-img" src={this.props.image}></img>
        </div>
        <p className="about-bio">{this.props.bio}</p>
        <div className="row icon-container">
          <a href={this.props.git} target="_blank"><i className="fa fa-github-square fa-2x about-icon"></i></a>
          <a href={this.props.linked} target="_blank"><i className="fa fa-linkedin-square fa-2x about-icon"></i></a>
        </div>
      </div>
    );
  }
}

export default AboutProfile;
