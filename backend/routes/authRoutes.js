const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator')
const prisma = require('../prisma/client');



router.post('/user', [
    body('userName')
        .trim()
        .not()
        .isEmpty(),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('password').trim().isLength({ min: 5 })
], authController.createUser);


module.exports = router;

