const path = require('path');
const fs = require('fs-extra');

class Activate {
	constructor(token, password) {
		this.token = token;
		this.password = password;
	}

	getTmpl() {
		return  fs.readFileSync(path.resolve(__dirname, '../../template/activateAccount.html'), 'utf-8');
	}
	generate(token = "") {
		let linkTmpl = this.getTmpl();
		linkTmpl = linkTmpl.replace(/(\${ACTIVATE_TOKEN})/gim, this.token);
		if (this.password) {
			linkTmpl = linkTmpl.replace(/(\${AUTOGEN_PASS})/gim, `Your auto-generated password is ${this.password}`);
		}else{
			linkTmpl = linkTmpl.replace(/(\${AUTOGEN_PASS})/gim, "");
		}
		return linkTmpl;
	}
}

module.exports = Activate;
