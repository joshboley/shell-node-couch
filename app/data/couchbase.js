var couchbase = require('couchbase');
var config = require('config');

// ********************************************************
// Functions to export
exports.get = get;
exports.upsert = upsert;
exports.remove = remove;

// ********************************************************
// Get connection string and bucket from config
var couchClusters = config.get('couchbase.connectionString');
var couchBucket = config.get('couchbase.bucket');

// Connect to cluster and open the bucket
var cluster = new couchbase.Cluster(couchClusters);
var bucket = cluster.openBucket(couchBucket);

// ********************************************************

/**
 * Gets a document from couchbase by key and them calls the 
 * provided callback function
 *
 * @param {string} [key] The document key/id to get
 * @param {Function} [callback] The callback function that will be executed
 *    after the get completes.  The callback will be passed an object with a success
 *    property {boolean} and a result property {Object}.
 */
function get (key, callback) {
	var ret = {
		success: false,
		result: undefined
	};

	bucket.get(key, function (err, result) {
		if (err) {
			ret.result = err;

			if (callback && typeof(callback) !== 'undefined') {
				callback(ret);
				return;
			}
		}

		ret.result = result.value;
		ret.success = true;

		if (callback && typeof(callback) !== 'undefined') {
			callback(ret);
			return;
		}
	});
}

/**
 * Inserts or updates a document from couchbase by key and them calls the 
 * provided callback function
 *
 * @param {string} [key] The document key/id to insert/update
 * @param {Object} [doc] The document object that will be inserted/updated in couchbase
 * @param {Function} [callback] The callback function that will be executed
 *    after the get completes.  The callback will be passed an object with a success
 *    property {boolean} and a result property {Object}.
 */
function upsert (key, doc, callback) {
	var ret = {
		success: false,
		result: undefined
	};

	bucket.upsert(key, doc, function (err, result) {
		if (err) {
			ret.result = err;

			if (callback && typeof(callback) !== 'undefined') {
				callback(ret);
				return;
			}

		}

		get(key, function (result) {
			if (callback && typeof(callback) !== 'undefined') {
				callback(result);
				return;
			}
		});
	});
}

/**
 * Deletes a document from couchbase by key and them calls the 
 * provided callback function
 *
 * @param {string} [key] The document key/id to delete
 * @param {Function} [callback] The callback function that will be executed
 *    after the get completes.  The callback will be passed an object with a success
 *    property {boolean} and a result property {Object}.
 */
function remove (key, callback) {
	var ret = {
		success: false,
		result: undefined
	};

	bucket.remove(key, function (err, result) {
		if (err) {
			ret.result = err;

			if (callback && typeof(callback) !== 'undefined') {
				callback(ret);
				return;
			}
		}

		ret.result = result.value;
		ret.success = true;

		if (callback && typeof(callback) !== 'undefined') {
			callback(ret);
			return;
		}
	});
}