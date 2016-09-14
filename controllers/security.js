'use strict';

const Config = require('../config');
const Boom = require('boom');
const jwt = require('jsonwebtoken');

exports.login = {
  auth: false,
  handler: function(request, reply) {
    let obj = {
      login: request.payload.email,
      senha: request.payload.senha,
      scope: ['Admin', 'User']
    }
    let token = jwt.sign(obj, Config.server.key);
    return reply({token: token});
  }
};

exports.logout = {
  auth: {
    scope: ['root']
  },
  handler: function(request, reply) {
    reply('You used a Token!');
  }
};
