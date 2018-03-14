const path = require('path');
const fs = require('fs-extra');
const config = require('../../config');
const dateHelper = require('../../helpers/date.helper');
const linkHelper = require('../../helpers/link.helper');

class LinkContainer {
	constructor(links) {
		this.links = links;
	}

	generate() {
		let linksHtml = '';
		let linkTmpl = fs.readFileSync(path.resolve(__dirname, '../../template/linksContainer.html'), 'utf-8');

		for (var i = 0; i < this.links.length; i++) {
			linksHtml += this.links[i].generate();
		}

		linkTmpl = linkTmpl.replace(/(\${Links})/gim, linksHtml);
		return linkTmpl;
	}
}

module.exports = LinkContainer;
