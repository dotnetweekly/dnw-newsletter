const BaseAutoBindedClass = require("../../helpers/base.autobind");
const activate = require("./activate");
const updateEmail = require("./updateEmail");
const forgotPassword = require("./forgotPassword");

class UsersHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.activate = (req, callback) => activate(req, callback);
    this.updateEmail = (req, callback) => updateEmail(req, callback);
    this.forgotPassword = (req, callback) => forgotPassword(req, callback);
  }
}

module.exports = UsersHandler;
