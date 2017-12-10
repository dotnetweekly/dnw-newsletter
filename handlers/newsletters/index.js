const BaseAutoBindedClass = require('../../helpers/base.autobind');
const generateNewsletter = require('./generateNewsletter');

class NewslettersHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.currentNewsletter = (req, callback) => generateNewsletter(req, callback);
	}
}

module.exports = NewslettersHandler;
