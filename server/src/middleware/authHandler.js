const errorResponse = require('../util/errorResponse');
const usersService = require('../service/usersService');
const catchError = require('./catchError');


module.exports = catchError(async (req, res, next) => {
    let token

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    }

    // check apa ada token
    if (!token) {
        throw new errorResponse('Not authorize to access this end point', 401)
    }

    //check apakah token terdaftar
    if (!usersService.token.get(token)) {
        throw new errorResponse('Not authorize to access this end point', 401)
    }

    next()
})