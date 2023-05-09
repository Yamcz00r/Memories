const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator')

router.post('/user', [
    body('userName').trim().isLength({ min: 5 }),
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 })
], authController.createUser);


module.exports = router;

