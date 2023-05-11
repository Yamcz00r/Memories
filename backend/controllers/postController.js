const prisma = require('../prisma/client');
const { validationResult } = require('express-validator');


exports.createPost = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Post creation failed');
        error.statusCode = 400;
        error.data = errors.array();
        throw error;
    };

    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 400;
        throw error;
    }
    try {
        const { title, description, tag } = req.body;
        const imageUrl = req.file.path.replace("\\", "/");

        const result = await prisma.post.create({
            data: {
                title,
                description,
                tag,
                imageUrl,
                author: {
                    connect: {
                        id: req.userId
                    }
                }
            }
        });

        res.status(201).json({
            message: "Created a post",
            result
        })

    } catch (error) {
        console.log(error)
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }


}

