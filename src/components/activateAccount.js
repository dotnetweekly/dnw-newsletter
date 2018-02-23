const Header = require('./header');
const Footer = require('./footer');
const ActivateAccount = require('./activate');

const Generator = require('../generator');
const generator = new Generator();

class Newsletter {
	constructor(token, password) {
		this.token = token;
		this.password = password;
	}

	generate() {
    const token = "";
		return generator.generate(
			[ new Header(false), new ActivateAccount(this.token, this.password) ].concat([ new Footer() ])
		);
	}
}

module.exports = Newsletter;
