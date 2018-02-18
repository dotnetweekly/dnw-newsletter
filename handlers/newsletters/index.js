const BaseAutoBindedClass = require('../../helpers/base.autobind');
const generateNewsletter = require('./generateNewsletter');
const getNewsletterList = require('./getNewsletterList');
const emailTmpl = require('./emailTmpl');

class NewslettersHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.currentNewsletter = (req, callback) => generateNewsletter(req, callback);
		this.getNewsletterList = (req, callback) => getNewsletterList(req, callback);
		this.emailTmpl = (req, callback) => emailTmpl(req, callback);
	}
}

module.exports = NewslettersHandler;
