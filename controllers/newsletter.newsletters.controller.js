const AdminBaseController = require("./newsletter.base.controller");
const NewsletterHandler = require("../handlers/newsletters");
const UserHandler = require("../handlers/user");

class NewslettersController extends AdminBaseController {
  constructor() {
    super();
    this._newsletterHandler = new NewsletterHandler();
    this._userHandler = new UserHandler();
  }

  getNewsletterList(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);
    if (response) {
      this._newsletterHandler.getNewsletterList(req, response);
    }
  }

  currentNewsletter(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);
    if (response) {
      this._newsletterHandler.currentNewsletter(req, response);
    }
  }

  userActivate(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);
    if (response) {
      this._userHandler.activate(req, response);
    }
  }

  updateEmail(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);
    if (response) {
      this._userHandler.updateEmail(req, response);
    }
  }

  forgotPassword(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);
    if (response) {
      this._userHandler.forgotPassword(req, response);
    }
  }

  emailTmpl(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);
    if (response) {
      this._newsletterHandler.emailTmpl(req, response);
    }
  }
}

module.exports = NewslettersController;
