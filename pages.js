'use strict';

exports.index = {
  auth: false,
  handler: function(request, reply) {
    return reply({text: 'Token not required'});
  }
};

exports.restricted = {
  handler: function(request, reply) {
    console.log(request.headers);
    return reply({text: 'You used a Token!'}).header('Authorization', request.headers.authorization);
  }
};
