const BaseAutoBindedClass = require('../../helpers/base.autobind');
const activate = require('./activate');
const updateEmail = require('./updateEmail');

class UsersHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.activate = (req, callback) => activate(req, callback);
		this.updateEmail = (req, callback) => updateEmail(req, callback);
	}
}

module.exports = UsersHandler;
