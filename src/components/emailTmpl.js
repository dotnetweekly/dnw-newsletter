const Header = require('./header');
const Footer = require('./footer');
const Link = require('./link');

const ContentContainer = require('./contentContainer');

const Generator = require('../generator');
const generator = new Generator();

class EmailTemplate {
	constructor(header, actionName, actionUrl, content) {
		this.header = header;
		this.actionName = actionName;
		this.actionUrl = actionUrl;
		this.content = content;
	}

	generate() {

		const tmpl = new ContentContainer(this.header, this.actionName, this.actionUrl, this.content);

		return generator.generate(
			[ new Header() ].concat([ tmpl ]).concat([ new Footer() ])
		);
	}
}

module.exports = EmailTemplate;
