const path = require('path');
const fs = require('fs-extra');

class Link {
	constructor(link) {
		this.link = link;
	}

	generate() {
		const linkTmpl = fs.readFileSync(path.resolve(__dirname, '../../template/link.html'), 'utf-8');
		return linkTmpl;
	}
}

module.exports = Link;
