
// Functions to export
module.exports = sampleController;

// ********************************************************

/**
 * Initializes the controller for samples and configures the route
 * and route parameters
 *
 * @param {Object} [router] An initialized express router on which to register the endpoints
 */
function sampleController (router) {

	var httpResponse = require('../helpers/http-response');
	var couchbase = require('../data/couchbase');
	
	// Set up the route and route params
	router.route('/sample/:keyName?')

		// ********************************************************
		// The route handler for a GET request
		.get(function (req, res, next) {

			try {
				if (!req.params.keyName) {
					httpResponse.notFound(res);
					return;
				}

				couchbase.get(req.params.keyName, function (result) {
					if (!result.success) {
						httpResponse.notFound(res);
						return;
					}

					httpResponse.ok(res, result.result);
				});
			} catch (ex) {
				httpResponse.badRequest(res, ex.toString());
			} 

		})

		// ********************************************************
		// The route handler for a POST request
		.post(function (req, res, next) {

			try {
				couchbase.upsert(req.body.keyName, req.body, function (result) {
					if (!result.success) {
						httpResponse.badRequest(res, 'Something went wrong while creating the document.');
						return;
					}

					httpResponse.ok(res, result.result);
				});
			} catch (ex) {
				httpResponse.badRequest(res, ex.toString());
			}

		})

		// ********************************************************
		// The route handler for a PUT request
		.put(function (req, res, next) {

			if (req.params.keyName !== req.body.keyName) {
				httpResponse.badRequest(res, 'URL keyName must match body keyName for a vaid put');
				return;
			}

			try {
				couchbase.upsert(req.params.keyName, req.body, function (result) {
					if (!result.success) {
						httpResponse.badRequest(res, 'Something went wrong while updating the document.');
						return;
					}

					httpResponse.ok(res, result.result);
				});
			} catch (ex) {
				httpResponse.badRequest(res, ex.toString());
			}

		})

		// ********************************************************
		// The route handler for a DELETE request
		.delete(function (req, res, next) {

			try {
				if (!req.params.keyName) {
					httpResponse.notFound(res);
					return;
				}

				couchbase.remove(req.params.keyName, function (result) {
					if (!result.success) {
						httpResponse.notFound(res);
						return;
					}

					httpResponse.ok(res, 'Success!');
				});
			} catch (ex) {
				httpResponse.badRequest(res, ex.toString());
			} 


		});

}