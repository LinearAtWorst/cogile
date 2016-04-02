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
  bio: "Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.",
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
  bio: "Nick is a software engineer focused on combining creative and technical skill to invent fun and beneficial products. An avid enthusiast of games, film, narrative theory, virtual reality, sushi, and dogs. When not building software, he's writing movie scripts, eating fresh fish, or playing with his dogs.",
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
      <div className="container">
        <h2 className="text-center no-top-margin">Meet The Team</h2>
        <h4 className="text-center"><a href="http://github.com/linearatworst/nimblecode"><i className="text-center fa fa-github-square fa-2x about-icon"></i></a> nimblecode repo</h4>
        <div className="row row-spacer"></div>
        <div className="">
        {Profiles}
        </div>
      </div>
    );
  }
}

export default About;
