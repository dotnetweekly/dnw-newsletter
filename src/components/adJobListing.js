const path = require('path');
const fs = require('fs-extra');

class AdJobListing {
	generate() {
		return fs.readFileSync(path.resolve(__dirname, '../../template/adJobListing.html'), 'utf-8');
	}
}

module.exports = AdJobListing;
