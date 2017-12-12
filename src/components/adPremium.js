const path = require('path');
const fs = require('fs-extra');

class AdPremium {
	generate() {
		return fs.readFileSync(path.resolve(__dirname, '../../template/adPremium.html'), 'utf-8');
	}
}

module.exports = AdPremium;
