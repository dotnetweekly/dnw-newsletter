const path = require('path');
const fs = require('fs-extra');
const config = require('../../config');

class Link {
	constructor(link) {
		this.link = link;
	}

	generate() {
		let linkTmpl = fs.readFileSync(path.resolve(__dirname, '../../template/link.html'), 'utf-8');
		linkTmpl = linkTmpl.replace(/(\${linkTitle})/gim, this.link.title);
		linkTmpl = linkTmpl.replace(/(\${linkResource})/gim, this.link.url);
		linkTmpl = linkTmpl.replace(/(\${linkUpvotes})/gim, this.link.upvotes.length);
		linkTmpl = linkTmpl.replace(
			/(\${linkUrl})/gim,
			`${config.clientDomain}${this.link.category.slug}/${this.link.slug}`
		);

		const categorySlug = this.link.category.slug;
		let imageUrl = `${config.newsletterDomain}images/`;
		switch (categorySlug) {
			case 'articles':
				imageUrl += 'article.png';
				break;
			case 'book':
				imageUrl += 'book.png';
				break;
			case 'events-training':
				imageUrl += 'training.png';
				break;
			case 'libraries-tools':
				imageUrl += 'tool.png';
				break;
			case 'videos':
				imageUrl += 'video.png';
				break;
		}

		linkTmpl = linkTmpl.replace(/(\${linkCategoryImage})/gim, imageUrl);
		return linkTmpl;
	}
}

module.exports = Link;
