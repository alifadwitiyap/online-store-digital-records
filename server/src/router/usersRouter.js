const express = require("express");
const UsersHandler = require("../handler/UsersHandler");
const protect = require("../middleware/authController");

/*eslint-disable */
const UsersRouter = express.Router();
const handler = new UsersHandler();
/*eslint-enable */

UsersRouter
	.route("/register")
	.post(handler.postRegisterHandler);

UsersRouter
	.route("/login")
	.post(handler.postLoginUserHandler);

UsersRouter
	.route("/logout")
	.delete(protect, handler.deleteLogoutUserHandler);

UsersRouter
	.route("/:id")
	.delete(protect, handler.deleteUserHandlerById);

module.exports = UsersRouter;
