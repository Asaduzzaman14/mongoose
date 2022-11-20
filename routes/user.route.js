const express = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifyToken,');


const router = express.Router();

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.get('/getme', verifyToken, userController.login)


module.exports = router