# nimblecode

Nimblecode was created by four software engineers at Makersquare, an immersive software engineering program in Los Angeles, CA. Are you looking to hire? Check out our Github pages.

## Getting Started

Here is a quick step by step to get started with our project


### Prerequisities

Fork the repo and clone locally

#### You must have node installed and have a MySQL db to connect to
The config file to connect to db is in server->db->config->config.js

#####Example of config layout:
```
module.exports = {
    db_host: 'HOST_IP',
    db_user: 'DB_USER',
    db_password: 'DB_PASSWORD',
    db_name: 'DB_NAME',
    charset: 'utf8',
    secret: 'DB_SECRET',
    clientID: 'CLIENT_ID',
    clientSecret: 'CLIENT SECRET'
  };
```

### Installing

clone repo where you would like

```
git clone https://github.com/LinearAtWorst/nimblecode.git
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
get it started!
```
nodemon server/server.js
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

Deployment info will change bewteen your choice of platform to use.  We used a AWS(Amazon Web Services) EC2 instance that hosted our server and Database on the same instance.  There is tutorials and info to do this on Amazon.

## Built With

* MySQL
* Node.js
* Bookshelf.js
* knex.js
* socket.io
* React.js

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
