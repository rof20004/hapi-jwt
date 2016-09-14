'use strict';

const Config = require('../config');
const Boom = require('boom');
const jwt = require('jsonwebtoken');

exports.login = {
  auth: false,
  handler: function(request, reply) {
    let obj = {
      id: 2,
      name: 'Rodolfo do Nascimento Azevedo',
      scope: ['Admin', 'User']
    }

    let token = jwt.sign(obj, Config.server.key);
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
