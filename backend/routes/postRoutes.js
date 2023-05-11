const express = require('express');
const { body } = require('express-validator');

const postController = require('../controllers/postController');
const router = express.Router();
const isAuth = require('../middleware/isAuth')

router.post('/post', [
    body('title')
        .not()
        .isEmpty()
        .withMessage("Make sure you write the tittle"),
    body('description')
        .not()
        .isEmpty()
        .withMessage("Make sure you write the description"),
    body('tag')
        .not()
        .isEmpty()
        .withMessage("Make sure you write the tags")
], isAuth, postController.createPost)

module.exports = router;