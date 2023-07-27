const prisma = require('../prisma/client');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

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
    const { description } = req.body;
    const imageUrl = req.file.path.replace("\\", "/");

    try {
        const result = await prisma.post.create({
            data: {
                description,
                imageUrl,
                author: {
                    connect: {
                        id: req.userId
                    }
                }
            }
        });

        return res.status(201).json({
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

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                comments: {
                    include: {
                        author: {
                            select: {
                                userName: true,
                                id: true
                            }
                        }
                    },

                },
                author: {
                    select: {
                        userName: true,
                        id: true
                    }
                },
            }
        });
        return res.status(200).json({
            posts
        })
    } catch (error) {
        console.log(error)
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getPost = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: true,
                comments: true,
                reactions: true
            }
        });
        if (!post) {
            const error = new Error('Post cant be found!');
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({
            message: 'Post was founded',
            post
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
}

exports.updatePost = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Post updating failed');
        error.statusCode = 400;
        error.data = errors.array();
        throw error;
    };

    const { postId } = req.params;
    const { description } = req.body;
    try {
        const existingPost = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });
        if (!existingPost) {
            const error = new Error('Post cant be found!');
            error.statusCode = 404;
            throw error;
        };

        if (req.userId !== existingPost.authorId) {
            const error = new Error('Not authorized');
            error.statusCode = 403;
            throw error;
        };

        let imagePath = '';
        if (!req.file) {
            imagePath = existingPost.imageUrl;
        } else {
            imagePath = req.file.path.replace("\\", "/");
        }

        if (imagePath !== existingPost.imageUrl) {
            clearImage(existingPost.imageUrl)
        }

        const result = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                description,

                imageUrl: imagePath
            }
        });
        return res.status(200).json({
            message: 'Successfully updated post',
            result,
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }

};

exports.searchPosts = async (req, res, next) => {
    const { q } = req.query;

    try {
        const posts = await prisma.post.findMany({
            where: {
                description: {
                    contains: q,
                    mode: 'insensitive'
                },
            }
        });
        if (!posts) {
            const err = new Error('No post found!');
            err.statusCode = 404;
            throw err;
        }
        res.status(200).json(posts)
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
}

exports.addReaction = async (req, res, next) => {
    const { postId } = req.params;
    let likeNumber;
    try {
        const existingPost = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });
        if (!existingPost) {
            const error = new Error('Post cant be found!');
            error.statusCode = 404;
            throw error;
        };

        likeNumber = existingPost.reactions + 1;

        console.log(likeNumber)
        const result = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                reactions: likeNumber
            }
        });


        return res.status(201).json({
            message: 'Successfully reacted to the post',
            result
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
};


exports.deletePost = async (req, res, next) => {
    const { postId } = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
        });

        if (!post) {
            const error = new Error('Cannot find post with this id!');
            error.statusCode = 404;
            throw error;
        }

        if (post.authorId.toString() !== req.userId.toString()) {
            const error = new Error('Not authorized');
            error.statusCode = 401;
            throw error
        }


        const commentsDelete = await prisma.comment.deleteMany({
            where: {
                postId: postId
            },
        });
        const result = await prisma.post.delete({
            where: {
                id: postId
            },
        });


        clearImage(post.imageUrl);
        return res.status(200).json({
            message: `Succesfully delated post with id ${post.id}`,
            result
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
}

exports.createComment = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 400;
        error.data = errors.array();
        throw error;
    }
    const { postId, content } = req.body;

    try {
        const result = await prisma.comment.create({
            data: {
                content,
                post: {
                    connect: {
                        id: postId
                    }
                },
                author: {
                    connect: {
                        id: req.userId
                    }
                }
            }
        });

        return res.status(201).json({
            message: 'Comment posted',
            result
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }

}

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, (err) => {
        console.log(err)
    })
};
