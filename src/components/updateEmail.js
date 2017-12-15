const Header = require('./header');
const Footer = require('./footer');
const UpdateEmailContent = require('./updateEmailContent');

const Generator = require('../generator');
const generator = new Generator();

class UpdateEmail {
	constructor(token) {
    this.token = token;
	}

	generate() {
    const token = "";
		return generator.generate(
			[ new Header(false), new UpdateEmailContent(this.token) ].concat([ new Footer() ])
		);
	}
}

module.exports = UpdateEmail;
