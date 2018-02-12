const BaseAutoBindedClass = require('../../helpers/base.autobind');
const generateNewsletter = require('./generateNewsletter');
const getNewsletterList = require('./getNewsletterList');
class NewslettersHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.currentNewsletter = (req, callback) => generateNewsletter(req, callback);
		this.getNewsletterList = (req, callback) => getNewsletterList(req, callback);
	}
}

module.exports = NewslettersHandler;
