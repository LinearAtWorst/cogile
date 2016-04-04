# nimblecode

Nimblecode is a code type-racing game to improve your speed and accuracy as a coder.  You can either race against the clock, or show off your skills in live muliplayer with your friends in a private or public game.

Nimblecode was started by four software engineers in Los Angeles with a vision of building a game that was both fun and educational. Play today at [nimblecode.io](http://nimblecode.io).

## Table of Contents
- [Getting Started](#getting-started)
- [Prerequisities](#prerequisities)
- [Installing](#installing)
- [Running the tests](#running-the-tests)
- [Deployment](#deployment)
- [Tech Stack](#tech-stack)
- [License](#license)
- [Our Team](#our-team)
	
## Getting Started

Here is a quick step by step if you'd like to contribute to our project


### Prerequisities

Fork the repo and clone locally

**You must have node installed and have a MySQL db to connect to**

You can set up a local db to connect to

The config file to connect to your db should be placed in **server -->db -->config -->config.js**

#####Example of config layout:
```
module.exports = {
    db_host: 'HOST_IP',
    db_user: 'DB_USER',
    db_password: 'DB_PASSWORD',
    db_name: 'DB_NAME',
    charset: 'utf8'
  };
```

### Installing

clone the repo where you would like

```
git clone https://github.com/nimblecode/nimblecode.git
```
cd into directory
```
cd nimblecode
```
run npm install
```
npm install
```
We often use nodemon to run node and it will relaunch node when changes are saved.
To get nodemon 
```
npm install nodemon -g
```
start the server!
```
npm start
```
default port on the project is 8080 as compiance with AWS
it should console.log 
```
listening at http://localhost:8080/
```
## Running the tests
We have a few tests for server side, please feel free to add more.

Our config is setup to run the test easily with npm.
```
npm test
```

## Deployment

Deployment info will change bewteen your choice of platform to use.  We used a AWS(Amazon Web Services) EC2 instance that hosted our server and Database on the same instance.  There are tutorials and info to do this on Amazon.

## Tech Stack

* React
* Redux
* React Router
* Node.js
* Express
* MySQL
* Socket.io
* Ace Code Editor

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details

#Our Team

##Mark
<img src="./client/assets/mark-profile.jpg" width="200" height="200" />
Mark is interested in using software to build useful products. He believes that empathy is key in designing great products, in collaborating with others, and in growing as a developer, as a leader, and as a person.
  
  
##Rick 
<img src="./client/assets/rick-profile.jpg" width="200" height="200" />
Rick loves travelling the world and eating awesome food everywhere he goes. When he's not being an amateur foodie, his goal in life is to become a React ninja, whipping up components and containers in no time.
  
  
##Nick 
<img src="./client/assets/nick-profile.jpg" width="200" height="200" />
Nick is a software engineer focused on combining creative and technical skill to invent fun and beneficial products. He is an avid enthusiast of games, film, narrative theory, virtual reality, sushi, and dogs.
  
  
##Jordan
<img src="./client/assets/jordan-profile.jpg" width="200" height="200" />
Jordan is a software engineer who owned his own business at 21. He is an avid, self-taught guitarist, who has owned and worked on a few project cars(0-60 in 4 sec). He also loves travelling around the world.

