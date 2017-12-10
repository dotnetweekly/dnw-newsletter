const AdminBaseController = require('./newsletter.base.controller');
const Handler = require('../handlers/newsletters');

class NewslettersController extends AdminBaseController {
	constructor() {
		super();
		this._handler = new Handler();
	}

	currentNewsletter(req, res, next) {
		const response = this._responseManager.getResponseHandler(req, res);
		if (response) {
			this._handler.currentNewsletter(req, response);
		}
	}
}

module.exports = NewslettersController;
