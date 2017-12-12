const path = require('path');
const fs = require('fs-extra');

class Header {
	getHeader() {
		return  fs.readFileSync(path.resolve(__dirname, '../../template/header.html'), 'utf-8');
	}
	generate(showRegister = true) {
		let linkTmpl = this.getHeader();
		let showRegisterValue = !showRegister ? "block" : "none";
		linkTmpl = linkTmpl.replace(/(\$DISPLAY_REGISTER)/gim, showRegisterValue);
		return linkTmpl;
	}
}

module.exports = Header;
