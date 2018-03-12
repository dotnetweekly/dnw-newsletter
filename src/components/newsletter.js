const Header = require('./header');
const FooterUnsubscribe = require('./footerUnsubscribe');
const Link = require('./link');
const LinkCategory = require('./linkCategory');
const NewsletterHeader = require('./newsletterHeader');
const AdPremium = require('./adPremium');
const AdSponsored = require('./adSponsored');
const AdJobListing = require('./adJobListing');

const Generator = require('../generator');
const generator = new Generator();

const categories = [
	{
		name: 'Events-training',
		slug: 'events-training'
	},
	{
		name: 'Articles',
		slug: 'articles'
	},
	{
		name: 'Books',
		slug: 'books'
	},
	{
		name: 'Libraries-Tools',
		slug: 'libraries-tools'
	},
	{
		name: 'Videos',
		slug: 'videos'
	}
];

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

		for (var i = 0; i < categories.length; i++) {
			const catLinks = this.links.filter(link => {
				return link.category === categories[i].slug;
			});
			if (catLinks.length > 0) {
				linkBlocks.push(new LinkCategory(categories[i].name, categories[i].slug));
			} else {
				continue;
			}
			for (var j = 0; j < catLinks.length; j++) {
				linkBlocks.push(new Link(catLinks[j], this.week, this.year));
			}
		}

		// for (var i = 0; i < this.links.length; i++) {
		// linkBlocks.push(new Link(this.links[i], this.week, this.year));
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
		// }
		return generator.generate(
			[new Header(), new NewsletterHeader(week, year)].concat(linkBlocks).concat([new FooterUnsubscribe()])
		);
	}
}

module.exports = Newsletter;
