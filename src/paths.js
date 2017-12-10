const path = require('path');
const fs = require('fs-extra');
const config = require('../config');

function getPaths() {
	return [
		[ '$DOMAIN_CLIENT', config.clientDomain ],
		[ '$DOMAIN_NEWSLETTER', config.newsletterDomain ],
		[ '$DOMAIN_API', config.api.domain ]
	];
}

function replacePaths(main) {
	const paths = getPaths();
	for (var i in paths) {
		const path = paths[i];
		const pathKey = path[0].replace('$', '\\$');
		var regexp = new RegExp(pathKey, 'gim');
		main = main.replace(regexp, path[1]);
	}
	return main;
}

module.exports = { replacePaths };
