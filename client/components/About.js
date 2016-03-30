import React, { Component } from 'react';
import AboutProfile from './AboutProfile.js';

var team = [{
  key: 1,
  name: "Mark Kim",
  bio: "Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas. Dynamically innovate resource-leveling customer service for state of the art customer service.",
  image: "../assets/mark-profile.jpg",
  git: "https://github.com/marksanghoonkim",
  linked: "https://www.linkedin.com/in/marksanghoonkim"
}, {
  key: 2,
  name: "Rick Yeh",
  bio: "Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.",
  image: "../assets/rick-profile.jpg",
  git: "https://github.com/rickyeh",
  linked: "https://www.linkedin.com/in/rickyeh"
}, {
  key: 3,
  name: "Jordan Allen",
  bio: "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.",
  image: "../assets/jordan-profile.jpg",
  git: "https://github.com/jordanallen98",
  linked: "https://www.linkedin.com/in/jordandallen"
}, {
  key: 4,
  name: "Nicholas Der",
  bio: "Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.",
  image: "../assets/nick-profile.jpg",
  git: "https://github.com/kiritsuzu",
  linked: "https://www.linkedin.com/in/kiritsuzu"
}];

class About extends Component {
  render() {
    var Profiles = team.map(function(profile){
      return ( <AboutProfile key={profile.key} name={profile.name} bio={profile.bio} image={profile.image} git={profile.git} linked={profile.linked}> </AboutProfile> );
    });

    return (
      <div className="container team">
        <h2 className="text-center no-top-margin">Meet The Team</h2>
        <div className="row row-spacer"></div>
        <div className="">
        {Profiles}
        </div>
      </div>
    );
  }
}

export default About;
