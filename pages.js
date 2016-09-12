'use strict';

const jwt = require('jsonwebtoken');

exports.index = {
  auth: false,
  handler: function(request, reply) {

    let obj = {
      id: 2,
      name: 'Rodolfo do Nascimento Azevedo',
      scopes: ['Admin', 'User']
    }

    let token = jwt.sign(obj, 'NeverShareYourSecret');

    return reply('<html>' +
                   '<head>' +
                         '<title>JWT Test</title>' +
                   '</head>' +
                   '<body>' +
                      '<form action="/restricted" method="post">' +
                        '<label>Nome: </label>' +
                        '<input type="text" id="nome" name="nome" />' +
                        '<button type="submit">Enviar</button>' +
                      '</form>' +
                   '</body>' +
                 '</html>')
                 .header('Authorization', token)
                 .state('token_auth_backend', token);
  }
};

exports.unrestricted = {
  auth: false,
  handler: function(request, reply) {
    const user = jwt.verify(request.state.token_auth_backend, 'NeverShareYourSecret');
    return reply('Este é o seu token: ' + request.state.token_auth_backend);
  }
};

exports.restricted = {
  handler: function(request, reply) {
    return reply({text: 'You used a Token!'})
                .header('Authorization', request.state.token_auth_backend)
                .state('token_auth_backend', request.state.token_auth_backend);
  }
};
