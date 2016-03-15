import React, { Component } from 'react';
import AboutProfile from './AboutProfile.js';

class About extends Component {
  render() {
    // tutorial1.js
    var team = [{
      key: 1,
      name: "Nicholas Der",
      bio: "Placeholder Bio",
      image: "../css/nick-profile.jpeg",
      git: "https://github.com/kiritsuzu",
      linked: "https://www.linkedin.com/in/kiritsuzu"
    }, {
      key: 2,
      name: "Rick Yeh",
      bio: "Placeholder Bio",
      image: "../css/rick-profile.jpeg",
      git: "https://github.com/rickyeh",
      linked: "https://www.linkedin.com/in/rickyeh"
    }, {
      key: 3,
      name: "Jordan Allen",
      bio: "Placeholder Bio",
      image: "../css/jordan-profile.jpeg",
      git: "https://github.com/jordanallen98",
      linked: "https://www.linkedin.com/in/jordandallen"
    }, {
      key: 4,
      name: "Mark Kim",
      bio: "Placeholder Bio",
      image: "../css/mark-profile.jpeg",
      git: "https://github.com/marksanghoonkim",
      linked: "https://www.linkedin.com/in/marksanghoonkim"
    }];

    var Profiles = team.map(function(profile){
      return ( <AboutProfile key = { profile.key } name = { profile.name } bio = { profile.bio } image = { profile.image } git = { profile.git } linked = { profile.linked }> </AboutProfile> );
    });

    return (
<<<<<<< Updated upstream
      <div>
        Nimbler One About Page
=======
      <div className="container">
        <h1 className="about-title">Meet The Team</h1>
        <div className="row row-spacer"></div>
        <div className="row">
        {Profiles}
        </div>
>>>>>>> Stashed changes
      </div>
    );
  }
}

export default About;
