'use strict';

const Security = require('./controllers/security');

exports.endpoints = [
	{method: 'POST',    path: '/login',										config: Security.login},
	{method: 'POST',    path: '/logout',								  config: Security.logout}
];
