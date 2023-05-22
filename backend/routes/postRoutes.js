const express = require('express');
const { body } = require('express-validator');

const postController = require('../controllers/postController');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const upload = require('../multer');

router.post('/post', upload.single('image'), [
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

router.post('/comment', isAuth, body('content').not().isEmpty().withMessage('Write some content'), postController.createComment)

router.get('/post', postController.getPosts);

router.delete('/post', isAuth, postController.deletePost);

module.exports = router;