var inky = require('inky');

inky(
	{
		src: 'generator/**/*.html',
		dest: 'template'
	},
	function() {
		console.log('Done parsing.');
	}
);
