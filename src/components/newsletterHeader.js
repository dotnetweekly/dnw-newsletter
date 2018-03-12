const path = require('path');
const fs = require('fs-extra');

class NewsletterHeader {
	constructor(week, year) {
		this.week = week;
		this.year = year;
	}

	generate() {
		let header = fs.readFileSync(path.resolve(__dirname, '../../template/newsletterHeader.html'), 'utf-8');
		header = header.replace(/(\${week})/gim, this.week);
		header = header.replace(/(\${year})/gim, this.year);
		return header;
	}
}

module.exports = NewsletterHeader;
