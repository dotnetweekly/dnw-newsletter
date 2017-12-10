const path = require('path');
const fs = require('fs-extra');

function getColorVariables() {
	var variableFile = fs.readFileSync(path.resolve(__dirname, '../styles/_variables.scss'), 'utf-8');

	var re = /(.*?):\s(.*?);(.*?)/gim;
	var colors = variableFile.match(re);

	colors = colors.map((color) => {
		const colorArr = color.split(': ');
		return [ colorArr[0], colorArr[1] ];
	});
	return colors;
}

function replaceColors(main) {
	const colors = getColorVariables();
	for (var i in colors) {
		const color = colors[i];
		const colorKey = color[0].replace('$', '\\$');
		var regexp = new RegExp(colorKey, 'gim');
		main = main.replace(regexp, color[1]);
	}
	return main;
}

module.exports = { replaceColors };
