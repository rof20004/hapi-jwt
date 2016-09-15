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
    try {
      jwt.verify(token, Config.server.key);
    } catch (e) {
      return reply(Boom.unauthorized(e.message));
    }
    reply({token: token});
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
