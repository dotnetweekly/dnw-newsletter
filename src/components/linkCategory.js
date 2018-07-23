const path = require('path');
const fs = require('fs-extra');
const config = require('../../config');
const dateHelper = require('../../helpers/date.helper');
const linkHelper = require('../../helpers/link.helper');

class Link {
	constructor(name, slug) {
		this.name = name;
		this.slug = slug;
	}

	generate() {
		let linkTmpl = fs.readFileSync(path.resolve(__dirname, '../../template/linkCategory.html'), 'utf-8');

		let imageUrl = `${config.newsletterDomain}images/`;
		switch (this.slug) {
			case 'articles':
				imageUrl += 'article.png';
				break;
			case 'books':
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
			case 'sponsored':
				imageUrl += 'sponsored.png';
				break;
			case 'job-listing':
				imageUrl += 'job-listing.png';
				break;
		}

		linkTmpl = linkTmpl.replace(/(\${linkCategoryImage})/gim, imageUrl);
		linkTmpl = linkTmpl.replace(/(\${linkCategoryName})/gim, this.name);
		linkTmpl = linkTmpl.replace(/(\${linkCategorySlug})/gim, this.slug);
		return linkTmpl;
	}
}

module.exports = Link;
