const Header = require('./header');
const FooterUnsubscribe = require('./footerUnsubscribe');
const Link = require('./link');
const LinkCategory = require('./linkCategory');
const LinkContainer = require('./linkContainer');
const NewsletterHeader = require('./newsletterHeader');

const Generator = require('../generator');
const generator = new Generator();

const categories = [
	{
		name: 'Sponsored',
		slug: 'sponsored'
	},
	{
		name: 'Events-training',
		slug: 'events-training'
	},
	{
		name: 'Job Listing',
		slug: 'job-listing'
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
	constructor(week, year, links, shellCategories) {
		this.week = week;
		this.year = year;
		this.links = links;
		this.shellCategories = shellCategories;
	}

	addLinksInCategory(catLinks, linkBlocks, linkContainers, category) {
		for (var j = 0; j < catLinks.length; j++) {
			// Break articles to add Job Listing
			if (j == 4 && category.slug === "articles" && catLinks.length > 5) {
				linkBlocks.push(new Link(catLinks[j], this.week, this.year));
				linkContainers.push(new LinkContainer(linkBlocks));
				linkBlocks = [];
				
				linkContainers.push(new LinkCategory(category.name, category.slug));
			} else {
				linkBlocks.push(new Link(catLinks[j], this.week, this.year));
			}
		}

		linkContainers.push(new LinkContainer(linkBlocks));
	}

	generate() {
		const linkContainers = [];
		const addedCategories = [];
		let jobListingHeadIndex = -1;
		let jobListingArticleIndex = -1;
		const { week, year } = this;

		if (!this.links) {
			return '';
		}

		for (var i = 0; i < categories.length; i++) {
			const catLinks = this.links.filter(link => {
				return link.category === categories[i].slug;
			});
			if (catLinks.length > 0) {
				addedCategories.push(categories[i].slug);
				linkContainers.push(new LinkCategory(categories[i].name, categories[i].slug));
				if (categories[i].slug === "articles") {
					jobListingArticleIndex = linkContainers.length - 1;
				} else if(categories[i].slug === "job-listing") {
					jobListingHeadIndex = linkContainers.length - 1;
				}
			} else {
				continue;
			}
			let linkBlocks = [];
			this.addLinksInCategory(catLinks, linkBlocks, linkContainers, categories[i]);
		}

		if (addedCategories.includes("job-listing") && addedCategories.includes("articles")) {
			let tempSwap = linkContainers[jobListingHeadIndex];
			let tempSwapContent = linkContainers[jobListingHeadIndex + 1];
			linkContainers[jobListingHeadIndex] = linkContainers[jobListingArticleIndex];
			linkContainers[jobListingArticleIndex] = tempSwap;
			linkContainers[jobListingHeadIndex + 1] = linkContainers[jobListingArticleIndex + 1];
			linkContainers[jobListingArticleIndex + 1] = tempSwapContent;
		} 

		return generator.generate(
			[new NewsletterHeader(week, year), new Header()]
			// .concat(sponsoredLinks)
			.concat(linkContainers)
			.concat([new FooterUnsubscribe()])
		);
	}
}

module.exports = Newsletter;
