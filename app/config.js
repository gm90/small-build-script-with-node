var configs = {
	// Default environnment
	env : "dev",
	templates : {},
	app : {},
	style: {}
};

// Put all files here, when in dev version we load all the files
configs.templates.dev = [
	"../app/templates/dashboard.html",
	"../app/templates/listing.html"
];
configs.app.dev = [
	// Dependencies
	"../assets/js/jquery.js",
	"../assets/js/jquery.cookie.js",

	// App files
	"../app/js/router.js",
	"../app/js/dashboard.js"
];

configs.style.dev = [
	// Stylesheets
	"../assets/css/style.css",
	"../assets/css/custom.css",
];

// File to load on prod server
configs.templates.prod = ["../build/dist/templates.html"];
configs.app.prod = ["../build/dist/app.min.js"];
configs.style.prod = ["../build/dist/styles.min.css"];


// needed for the build script, that tells nodejs to return this variable from the loaded module
try{
	if(exports) exports.configs = configs;
}catch(e){
  
}

