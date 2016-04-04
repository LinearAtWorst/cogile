import React, { Component } from 'react';
import AboutProfile from './AboutProfile.js';

var team = [{
  key: 1,
  name: "Mark Kim",
  bio: "Mark is interested in using software to build useful products. He believes that empathy is key in designing great products, in collaborating with others, and in growing as a developer, as a leader, and as a person.",
  image: "../assets/mark-profile.jpg",
  git: "https://github.com/marksanghoonkim",
  linked: "https://www.linkedin.com/in/marksanghoonkim",
  email: "mailto:mark.s.kim@gmail.com",
  twitter: "https://twitter.com/marksanghoonkim"
}, {
  key: 2,
  name: "Rick Yeh",
  bio: "Rick loves travelling the world and eating awesome food everywhere he goes.  When he's not being an amateur foodie, his goal in life is to become a React ninja, whipping up components like no other.",
  image: "../assets/rick-profile.jpg",
  git: "https://github.com/rickyeh",
  linked: "https://www.linkedin.com/in/rickyeh",
  email: "mailto:rickbyeh@gmail.com"
}, {
  key: 3,
  name: "Jordan Allen",
  bio: "Jordan is a software engineer who owned his own business at 21. He is an avid, self-taught guitarist, who has owned and worked on a few project cars(0-60 in 4 sec). He also loves travelling around the world.",
  image: "../assets/jordan-profile.jpg",
  git: "https://github.com/jordanallen98",
  linked: "https://www.linkedin.com/in/jordandallen",
  email: "mailto:jordan.allen98@gmail.com"
}, {
  key: 4,
  name: "Nicholas Der",
  bio: "Nick is a software engineer focused on combining creative and technical skill to invent fun and beneficial products. He is an avid enthusiast of games, film, narrative theory, virtual reality, sushi, and dogs.",
  image: "../assets/nick-profile.jpg",
  git: "https://github.com/kiritsuzu",
  linked: "https://www.linkedin.com/in/kiritsuzu",
  email: "mailto:nickd2312@gmail.com"
}];

class About extends Component {
  render() {
    var Profiles = team.map(function(profile) {
      return (
        <AboutProfile
          key={profile.key}
          name={profile.name}
          bio={profile.bio}
          image={profile.image}
          git={profile.git}
          linked={profile.linked}
          email={profile.email} >
        </AboutProfile>
      );
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
            <p>Nimblecode was started by four software engineers in Los Angeles with a vision of building a game that was both fun and educational. It was developed with a React/Redux front-end and a Node/Express back-end. It leverages socket.io for real-time, bidirectional communication and utilizes Ace for the code editors.</p>
            <p>If you'd like to contact us about any opportunities, or would like to contribute to our project, check us out at our <a href="http://github.com/nimblecode/nimblecode" target="_blank">github repo</a> or send us an <a href="mailto:nimblecodeio@gmail.com" target="_blank">email</a>. </p>
            <h4 className="text-center">
              <a href="http://github.com/nimblecode/nimblecode" target="_blank"><i className="text-center fa fa-github-square fa-2x about-icon"></i></a>
              <a href="mailto:nimblecodeio@gmail.com" target="_blank"><i className="text-center fa fa-envelope fa-2x about-icon"></i></a>
            </h4>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    );
  }
}

export default About;
