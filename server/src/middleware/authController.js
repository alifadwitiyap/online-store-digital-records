const usersService = require("../service/UsersService");
const ErrorResponse = require("../utils/ErrorResponse");
const errorCatcher = require("./errorCatcher");

module.exports = errorCatcher(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		[, token] = req.headers.authorization.split(" ");
	}

	// check apa ada token || check apakah token terdaftar
	if (!token || !usersService.token.get(token)) {
		throw new ErrorResponse("Not authorize to access this end point", 401);
	}

	next();
});
