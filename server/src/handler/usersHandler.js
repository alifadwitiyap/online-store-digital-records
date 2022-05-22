const usersService = require("../service/usersService");
const errorCatcher = require("../middleware/errorCatcher");

require("dotenv").config();

class usersHandler {
	constructor() {
		this._service = new usersService();

		// make promise to send err to next and binding "this"
		this.postRegisterHandler = errorCatcher(this.postRegisterHandler.bind(this));
		this.deleteUserHandlerById = errorCatcher(this.deleteUserHandlerById.bind(this));
		this.postLoginUserHandler = errorCatcher(this.postLoginUserHandler.bind(this));
		this.deleteLogoutUserHandler = errorCatcher(this.deleteLogoutUserHandler.bind(this));
	}

	// @desc add user
	// @route POST /users/register
	async postRegisterHandler(req, res) {
		const data = await this._service.registerUser(req.body);
		res.status(201).json({
			isSuccess: true,
			data
		});
	}

	// @desc delete user
	// @route Delete /users/:id
	async deleteUserHandlerById(req, res) {
		await this._service.deleteUser(req.params);
		res.status(200).json({
			isSuccess: true,
			message: "akun berhasil dihapus"
		});
	}
	// @desc  user login
	// @route POST /users/login
	async postLoginUserHandler(req, res) {
		const data = await this._service.loginUser(req.body);
		res.status(200).json({
			isSuccess: true,
			data
		});
	}

	// @desc  user logout
	// @route POST /users/logout
	async deleteLogoutUserHandler(req, res) {
		await this._service.logoutUser(req.headers);
		res.status(200).json({
			isSuccess: true,
			message: "akun berhasil logout"
		});
	}
}

module.exports = usersHandler;
