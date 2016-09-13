'use strict';

const Boom = require('boom');
const jwt = require('jsonwebtoken');

exports.index = {
  auth: false,
  handler: function(request, reply) {

    let obj = {
      id: 2,
      name: 'Rodolfo do Nascimento Azevedo',
      scope: ['Admin', 'User']
    }

    let token = jwt.sign(obj, 'NeverShareYourSecret');

    reply.view('index').state('token_auth_backend', token);
  }
};

exports.restricted = {
  auth: {
    scope: ['Admin']
  },
  handler: function(request, reply) {
    try {
      const user = jwt.verify(request.state.token_auth_backend, 'NeverShareYourSecret');
    } catch (e) {
      return reply(Boom.badImplementation(e));
    }
    reply('You used a Token!');
  }
};
