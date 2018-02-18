const path = require('path');
const fs = require('fs-extra');

class FooterUnsubscribe {
	generate() {
		return fs.readFileSync(path.resolve(__dirname, '../../template/footerUnsubscribe.html'), 'utf-8');
	}
}

module.exports = FooterUnsubscribe;
