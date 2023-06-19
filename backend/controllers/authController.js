const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { password, email, userName } = req.body;
        const userWithExistingEmail = await prisma.user.findUnique({ where: { email: email } })
        if (userWithExistingEmail) {
            const error = new Error('User with this email already existing. Please choose another email');
            error.statusCode = 404;
            throw error;
        };
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await prisma.user.create({ data: { password: hashedPassword, email, userName } })
        res.status(201).json({
            message: 'Successfully created a user!',
            result,
        });
    } catch (error) {
        console.log(error)
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { password, email } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            const error = new Error("Sorry we can't find a user with this email. ");
            error.statusCode = 404;
            throw error;
        };
        const passwordDoMatch = await bcrypt.compare(password, user.password);

        if (!passwordDoMatch) {
            const error = new Error("Wrong password, try again!");
            error.statusCode = 403;
            throw error;
        }

        const token = jwt.sign({
            email,
            userId: user.id
        }, 'supersecretthing', { expiresIn: "2d" })

        res.status(200).json({
            message: "Succesfully logged in",
            token
        });
    } catch (error) {
        console.log(error)
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getUserInfo = async (req, res, next) => {
    try {
        const userInfo = await prisma.user.findUnique({
            where: { id: req.userId }, select: {
                email: true,
                userName: true,
                createdAt: true,
                id: true
            }
        });
        if (!userInfo) {
            const error = new Error('There are no user with this id');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            userInfo
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.updateUserData = async (req, res, next) => {
    try {
        const { userName, email } = req.body;

        if (!userName && !email) {
            const error = new Error('No value to update');
            error.statusCode = 400;
            throw error
        }

        const userToUpdate = await prisma.user.findUnique(
            {
                where: {
                    id: req.userId
                }
            }
        );

        const newData = {};

        if (!email) {
            newData.email = userToUpdate.email,
                newData.userName = userName

        } else if (!userName) {
            newData.email = email,
                newData.userName = userName
        } else {
            newData.email = email,
                newData.userName = userName
        }

        const result = await prisma.user.update(
            {
                where: {
                    id: req.userId
                },
                data: newData
            }
        )

        res.status(200).json({
            message: 'Successfully updated a user',
            result
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const result = await prisma.user.delete({
            where: {
                id: req.userId
            }
        });
        res.status(200).json({
            messsage: 'Successfully deleted a user',
            result
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}