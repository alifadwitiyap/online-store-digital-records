const usersService = require('../service/usersService');
const catchError = require('../middleware/catchError');
require('dotenv').config()


class usersHandler {
    constructor() {
        this._service = new usersService();

        // make promise to send err to next and binding "this"
        this.postRegisterHandler = catchError(this.postRegisterHandler.bind(this));
        this.deleteUserHandlerById = catchError(this.deleteUserHandlerById.bind(this));
        this.postLoginUserHandler = catchError(this.postLoginUserHandler.bind(this));
        this.deleteLogoutUserHandler = catchError(this.deleteLogoutUserHandler.bind(this));
    }

    // @desc add user
    // @route POST /users/register
    async postRegisterHandler(req, res, next) {
        const data = await this._service.registerUser(req.body)
        res.status(201).json({
            isSuccess: true,
            data: data
        })
    }

    // @desc delete user
    // @route Delete /users/:id
    async deleteUserHandlerById(req, res, next) {
        await this._service.deleteUser(req.params)
        res.status(200).json({
            isSuccess: true,
            msg: "akun berhasil dihapus"
        })
    }
    // @desc  user login
    // @route POST /users/login
    async postLoginUserHandler(req, res, next) {
        const data = await this._service.loginUser(req.body)
        res.status(200).json({
            isSuccess: true,
            data: data
        })
    }

    // @desc  user logout
    // @route POST /users/logout
    async deleteLogoutUserHandler(req, res, next) {
        await this._service.logoutUser(req.headers)
        res.status(200).json({
            isSuccess: true,
            msg: "akun berhasil logout"
        })
    }

}

module.exports = usersHandler