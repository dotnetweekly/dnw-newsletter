const path = require('path');
const fs = require('fs-extra');

class AdSponsored {
	generate() {
		return fs.readFileSync(path.resolve(__dirname, '../../template/adSponsored.html'), 'utf-8');
	}
}

module.exports = AdSponsored;
