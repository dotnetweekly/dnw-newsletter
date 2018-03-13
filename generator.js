var inky = require('inky');

inky(
	{
		src: 'generator/**/*.html',
		dest: 'template'
	},
	function(file) {
		console.log(file);
		console.log('Done parsing.');
	}
);
