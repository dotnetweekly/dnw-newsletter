const path = require('path');
const fs = require('fs-extra');

class Header {
	generate() {
		return fs.readFileSync(path.resolve(__dirname, '../../template/header.html'), 'utf-8');
	}
}

module.exports = Header;
