const path = require('path');
const fs = require('fs-extra');
const config = require('../../config');
const dateHelper = require('../../helpers/date.helper');
const linkHelper = require('../../helpers/link.helper');

class Link {
	constructor(link, week, year) {
		this.link = link;
		this.week = week;
		this.year = year;
	}

	generate() {
		let linkTmpl = fs.readFileSync(path.resolve(__dirname, '../../template/link.html'), 'utf-8');
		let linkContentTmpl = fs.readFileSync(path.resolve(__dirname, '../../template/linkContent.html'), 'utf-8');
		let linkImageTmpl = fs.readFileSync(path.resolve(__dirname, '../../template/linkImage.html'), 'utf-8');

		if (this.link.template) {
			return linkTmpl;
		}

		var utmString = `utm_campaign=dotNET Weekly&utm_medium=email&utm_source=week-${this.week}_year-${this.year}`;
		let resourceUrl = this.link.url;
		if (!resourceUrl.includes('?')) {
			resourceUrl += '?' + utmString;
		} else {
			resourceUrl += '&' + utmString;
		}

		linkTmpl = linkTmpl.replace(/(\${linkTitle})/gim, this.link.title);
		linkTmpl = linkTmpl.replace(/(\${linkResource})/gim, resourceUrl);
		if (this.link.category === "sponsored" || this.link.category === "job-listing") {
			if (this.link.imageUrl) {
				linkImageTmpl = linkImageTmpl.replace(/(\${imageUrl})/gim, this.link.imageUrl);
				linkContentTmpl = linkContentTmpl.replace(/(\${linkImage})/gim, linkImageTmpl);
			} else {
				linkContentTmpl = linkContentTmpl.replace(/(\${linkImage})/gim, "");
			}
			linkContentTmpl = linkContentTmpl.replace(/(\${linkContent})/gim, this.link.content);
			linkTmpl = linkTmpl.replace(/(\${linkContent})/gim, linkContentTmpl);
		} else {
			linkTmpl = linkTmpl.replace(/(\${linkContent})/gim, "");
		}
		linkTmpl = linkTmpl.replace(/(\${linkUpvotes})/gim, this.link.upvotes.length);
		linkTmpl = linkTmpl.replace(/(\${linkDate})/gim, dateHelper.formatDate(this.link.createdOn));
		linkTmpl = linkTmpl.replace(/(\${linkRoot})/gim, linkHelper.extractRootDomain(this.link.url));
		linkTmpl = linkTmpl.replace(/(\${username})/gim, this.link.user.username);
		linkTmpl = linkTmpl.replace(
			/(\${linkUrl})/gim,
			`${config.clientDomain}${this.link.category}/${this.link.slug}`
		);
		linkTmpl = linkTmpl.replace(/(\${linkTags})/gim, this.link.tags.join(', '));

		return linkTmpl;
	}
}

module.exports = Link;
