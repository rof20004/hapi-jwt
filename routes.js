'use strict';

const Pages = require('./pages');

exports.endpoints = [
	{method: 'GET',    	path: '/',											    config: Pages.index},
	{method: 'GET',    	path: '/restricted',								config: Pages.restricted}
];
