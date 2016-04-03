import React, { Component } from 'react';
import AboutProfile from './AboutProfile.js';

var team = [{
  key: 1,
  name: "Mark Kim",
  bio: "Mark is a software engineer interested in using software to build useful products. He strongly believes that empathy is key. It is key in designing good products, in working well as a member of a team, and in growing as a developer, a leader, and as a person.",
  image: "../assets/mark-profile.jpg",
  git: "https://github.com/marksanghoonkim",
  linked: "https://www.linkedin.com/in/marksanghoonkim",
  twitter: "https://twitter.com/marksanghoonkim"
}, {
  key: 2,
  name: "Rick Yeh",
  bio: "Rick loves travelling the world and eating awesome food everywhere he goes.  When he's not being an amateur foodie, his goal in life is to become a React ninja, whipping up components like no other.",
  image: "../assets/rick-profile.jpg",
  git: "https://github.com/rickyeh",
  linked: "https://www.linkedin.com/in/rickyeh"
}, {
  key: 3,
  name: "Jordan Allen",
  bio: "Jordan is a software engineer who owned his own business at 21, is a avid, self-taught(mostly) guitarist, and also has owned and worked on a couple project cars(0 - 60 around 4 seconds). He loves traveling around the world every chance he gets.",
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10 about-description">
            <h2 className="text-center no-top-margin">Meet The Team</h2>
            <div className="">{Profiles}</div>
          </div>
          <div className="col-sm-1"></div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10 about-description">
            <p>Nimblecode was started by four software engineers in Los Angeles with a vision of building a game that was both fun and educational. It was developed a React and Redux front-end with an Express backend. It leverages socket.io for real-time, bidirectional communication and utilizes Ace for the code editors.</p>
            <p>If you'd like to contact us about any opportunities, or would like to contribute to our project, check us out at our github repo or send us an email. </p>
            <h4 className="text-center">
              <a href="http://github.com/nimblecode/nimblecode"><i className="text-center fa fa-github-square fa-2x about-icon"></i></a>
              <a href="mailto:nimblecodeio@gmail.com"><i className="text-center fa fa-envelope fa-2x about-icon"></i></a>
            </h4>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    );
  }
}

export default About;
