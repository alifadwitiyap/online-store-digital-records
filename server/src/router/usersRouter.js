const express = require("express");
const usersHandler = require('../handler/usersHandler');
const protect = require("../middleware/authController");

/*eslint-disable */
const usersRouter = express.Router();
const handler = new usersHandler();
/*eslint-enable */

usersRouter
	.route("/register")
	.post(handler.postRegisterHandler);

usersRouter
	.route("/login")
	.post(handler.postLoginUserHandler);

usersRouter
	.route("/logout")
	.delete(protect, handler.deleteLogoutUserHandler);

usersRouter
	.route("/:id")
	.delete(protect, handler.deleteUserHandlerById);

module.exports = usersRouter;
