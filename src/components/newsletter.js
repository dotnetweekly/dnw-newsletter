const Header = require('./header');
const FooterUnsubscribe = require('./footerUnsubscribe');
const Link = require('./link');
const NewsletterHeader = require('./newsletterHeader');
const AdPremium = require('./adPremium');
const AdSponsored = require('./adSponsored');
const AdJobListing = require('./adJobListing');

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

		if (!this.links) {
			return '';
		}

		for (var i = 0; i < this.links.length; i++) {
			linkBlocks.push(new Link(this.links[i], this.week, this.year));
			/* if (i == 1) {
				linkBlocks.push(new AdPremium());
			}
			if (i == 4) {
				linkBlocks.push(new AdSponsored());
			}
			if (i == 6) {
				linkBlocks.push(new AdSponsored());
			}
			if (i == 8) {
				linkBlocks.push(new AdJobListing());
			} */
		}
		return generator.generate(
			[ new Header(), new NewsletterHeader(week, year) ].concat(linkBlocks).concat([ new FooterUnsubscribe() ])
		);
	}
}

module.exports = Newsletter;
