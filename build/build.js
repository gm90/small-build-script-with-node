/* You need uglify
// npm install node-minify
// Run that into node and voila
*/
var FILE_ENCODING = 'utf-8',

EOL = '\n';

var _fs = require('fs');
var compressor = require('node-minify');

// Using Google Closure with jQuery 2.0
var filesArray = require('../app/config')

function concat(opts) {

	var fileList = opts.src;
	var distPath = opts.dest;

	console.log('Concatenating '+ fileList.length +' Files');

	var out = fileList.map(function(filePath){
		return _fs.readFileSync(filePath, FILE_ENCODING);
	});

	_fs.writeFileSync(distPath, out.join(EOL), FILE_ENCODING);
	console.log('Concatenation complete: '+ distPath +'.');
}

// Concatenate templates
concat({
	src : filesArray.configs.templates.dev,
	dest : 'dist/templates.html'
});

// Concatenate JS files
concat({
	src : filesArray.configs.app.dev,
	dest : 'dist/appfiles.js'
});

// Concatenate Stylesheets files
concat({
	src : filesArray.configs.style.dev,
	dest : 'dist/styles.css'
});

// Use node-minify & google closure to compress JS files
function closure(srcPath, distPath){

	console.log('Comprssing Scripts.');

	new compressor.minify({
	    type: 'gcc',
	    language: 'ECMASCRIPT5',
	    fileIn: srcPath,
	    fileOut: distPath,
	    callback: function(err){
	        console.log('Oops: ');
	        console.log(err);
	    }
	});
}

// Use node-minify & Sqwish to compress CSS files
function sqwish(srcPath, distPath){

	console.log('Compressing Stylesheets.');

	new compressor.minify({
	    type: 'sqwish',
	    fileIn: srcPath,
	    fileOut: distPath,
	    callback: function(err){
	        console.log('Ouch: ');
	        console.log(err);
	    }
	});
}

closure('dist/appfiles.js', 'dist/appfiles.min2.js');
sqwish('dist/styles.css', 'dist/styles.min.css');

console.log("Build complete.");
process.exit(1);