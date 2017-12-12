const Header = require('./header');
const Footer = require('./footer');
const ActivateAccount = require('./activate');

const Generator = require('../generator');
const generator = new Generator();

class Newsletter {
	constructor(token) {
    this.token = token;
	}

	generate() {
    const token = "";
		return generator.generate(
			[ new Header(false), new ActivateAccount(this.token) ].concat([ new Footer() ])
		);
	}
}

module.exports = Newsletter;
