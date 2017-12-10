const Header = require('./header');
const Footer = require('./footer');
const Link = require('./link');
const NewsletterHeader = require('./newsletterHeader');

const Generator = require('../generator');
const generator = new Generator();

class Newsletter {
	constructor(week, year, links) {
		this.week = week;
		this.year = year;
		this.links = links;
	}

	generate() {
		const linkBlocks = [];
		const { week, year } = this;

		for (var i in this.links) {
			linkBlocks.push(new Link(this.links[i]));
		}
		return generator.generate(
			[ new Header(), new NewsletterHeader(week, year) ].concat(linkBlocks).concat([ new Footer() ])
		);
	}
}

module.exports = Newsletter;
