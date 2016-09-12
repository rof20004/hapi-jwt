'use strict';

const Hapi = require('hapi');
const Config = require('./config');
const Routes = require('./routes');

const server = new Hapi.Server();
server.connection({
  host: Config.server.host,
  port: Config.server.port,
  routes: {
    cors: {
      origin: ['*'],
      exposedHeaders: ['Authorization']
    }
  }
});

var people = { // our "users database"
    1: {
      id: 1,
      name: 'Jen Jones'
    }
};

// bring your own validation function
var validate = function (decoded, request, callback) {
  // do your checks to see if the person is valid
  if (!people[decoded.id]) {
    return callback(null, false);
  } else {
    return callback(null, true);
  }
};

server.register([
  require('hapi-auth-jwt2')
], (err) => {

  if (err) {
    throw err;
  }

  server.auth.strategy('jwt', 'jwt', true, {
    key: 'NeverShareYourSecret', //'Hap1S3rv3r_for_polymerProject_production', // Never Share your secret key
    validateFunc: validate,                          // validate function defined above
    verifyOptions: {algorithms: ['HS256']}           // pick a strong algorithm
  });

  server.route(Routes.endpoints);

  // Start the server
  server.start((err) => {
    console.log('Server   started:', server.info.uri);
  });
});
