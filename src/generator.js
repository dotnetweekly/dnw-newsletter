const path = require('path');
const fs = require('fs-extra');

const { replaceColors } = require('../src/colors');
const { replacePaths } = require('../src/paths');

class Generator {
	constructor() {
		this.main = this.getMain();
		this.styles = this.getStyles();
	}

	getStyles() {
		return fs.readFileSync(path.resolve(__dirname, '../public/styles.css'), 'utf-8');
	}

	getMain() {
		return fs.readFileSync(path.resolve(__dirname, '../template/main.html'), 'utf-8');
	}

	generate(components) {
		let bodyHtml = '';
		let newsletterHtml = '';

		for (var i in components) {
			bodyHtml += components[i].generate();
		}

		newsletterHtml = this.main;
		newsletterHtml = newsletterHtml.replace('{{ STYLE }}', this.styles);
		newsletterHtml = newsletterHtml.replace('{{ BODY }}', bodyHtml);
		newsletterHtml = replaceColors(newsletterHtml);
		newsletterHtml = replacePaths(newsletterHtml);

		return newsletterHtml;
	}
}

module.exports = Generator;
