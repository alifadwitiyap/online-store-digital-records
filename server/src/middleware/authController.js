const ErrorResponse = require("../utils/ErrorResponse");
const errorCatcher = require("./errorCatcher");
const cacheService = require('../service/cacheService');


module.exports = errorCatcher(async (req, res, next) => {
	let token;
	const cache = new cacheService();

	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		[, token] = req.headers.authorization.split(" ");
	}

	// check apa ada token || check apakah token terdaftar
	if (!token || !await cache.get(token)) {
		throw new ErrorResponse("Not authorize to access this end point", 401);
	}

	next();
});
