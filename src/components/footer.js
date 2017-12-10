const path = require('path');
const fs = require('fs-extra');

class Footer {
	generate() {
		return fs.readFileSync(path.resolve(__dirname, '../../template/footer.html'), 'utf-8');
	}
}

module.exports = Footer;
