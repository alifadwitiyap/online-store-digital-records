
const express = require('express');
const usersHandler = require('../handler/usersHandler');
const protect = require('../middleware/authHandler');

const handler = new usersHandler()
const router = express.Router()

router
    .route('/register')
    .post(handler.postRegisterHandler)

router
    .route('/login')
    .post(handler.postLoginUserHandler)

router
    .route('/logout')
    .delete(protect, handler.deleteLogoutUserHandler)

router
    .route('/:id')
    .delete(protect, handler.deleteUserHandlerById)


module.exports = router