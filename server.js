var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var httpResponse = require('./app/helpers/http-response');

// ********************************************************
// Initialize the app
var app = express();

// Get the port to run on
var port = config.get('port');

// Initialize the router
var router = express.Router();

// ********************************************************
// Add the JSON parser
app.use(bodyParser.json());

// Set up the api route
app.use('/api', router);

// Set a default 404 not found for invalid URLs
app.use(function (req, res) {
	httpResponse.notFound(res, 'Invalid URL specified.');
});

// ********************************************************
// Initializer all controllers
bootstrapControllers();

// Listen on the specified port
app.listen(port);
console.log('Node initialized and listening on port: ' + port);

// ********************************************************

/**
 * 'Requires' in all of the controllers in the controllers directory
 *  and initialized them with the router
 */
function bootstrapControllers () {
	var ctrlPath = '/app/controllers';
	var controllers = fs.readdirSync(__dirname + ctrlPath);

	controllers.forEach(function (controller) {
		require('.' + ctrlPath + '/' + controller)(router);
	});
}

