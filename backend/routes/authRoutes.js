const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator')
const isAuth = require('../middleware/isAuth');

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
    body('password').custom((password) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!pattern.test(password)) {
            throw new Error('Invalid password')
        };
        return true;
    })
], authController.createUser);

router.post('/login', authController.login);

router.get('/user', isAuth, authController.getUserInfo);

router.patch('/user', isAuth, authController.updateUserData)

router.delete('/user', isAuth, authController.deleteUser)

module.exports = router;

