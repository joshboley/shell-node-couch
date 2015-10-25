
// Functions to export
exports.ok = ok;
exports.badRequest = badRequest;
exports.notFound = notFound;

// ********************************************************

// Used for successful 200 responses
function ok (res, json) {
	res.json(json);	
}

// Used for unsuccessful 400 Bad Request Responses
function badRequest (res, msg) {
	res.status(400).send(msg);
} 

// Used for unsuccessful 404 Not Found Responses
function notFound (res, msg) {
	res.status(404).send(msg);
}