'use strict';

const Hapi = require('hapi');
const Config = require('./config');
const Routes = require('./routes');
const Moment = require('moment');
const server = new Hapi.Server();

server.connection({
  host: Config.server.host,
  port: Config.server.port,
  routes: {
    cors: true
  }
});

// Validate function to be injected
var validate = function(decoded, request, callback) {
  console.log(decoded);
  console.log('ENTROU AQUI VELHO');
  var ttl = 1 * 30 * 1000 * 60;
  // Check token timestamp
  var diff = Moment().diff(Moment(decoded.iat * 1000));
  if (diff > ttl) {
    return callback(null, false);
  }
  callback(null, true);
};

server.register([
  require('hapi-auth-jwt2')
], (err) => {

  if (err) {
    throw err;
  }

  server.state('token_auth_backend', {
    ttl: 1 * 30 * 1000 * 60,
    isSecure: false,
    isHttpOnly: true,
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
  });

  server.auth.strategy('jwt', 'jwt', true, {
    key: 'NeverShareYourSecret', //'Hap1S3rv3r_for_polymerProject_production', // Never Share your secret key
    validateFunc: validate, // validate function defined above
    verifyOptions: {
      algorithms: ['HS256']
    } // pick a strong algorithm
  });

  server.route(Routes.endpoints);

  // Start the server
  server.start((err) => {
    console.log('Server   started:', server.info.uri);
  });
});
