const path = require('path');
const fs = require('fs-extra');
const inlineCss = require('inline-css');

const styleRules = fs.readFileSync(path.resolve(__dirname, '../public/styles.css'), 'utf-8');

const CSSHelper = {
	inlineCssInHtml(pureHtml) {
		return new Promise((resolve, reject) => {
			inlineCss(pureHtml, {
				extraCss: styleRules,
				url: ' '
			})
				.then(function(inlinedHtml) {
					resolve(inlinedHtml);
				})
				.catch(error => {
					console.log(error);
					reject();
				});
		});
	}
};

module.exports = CSSHelper;
