const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client');

exports.createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    try {
        const { password, email, userName } = req.body;
        const userWithExistingEmail = await prisma.user.findUnique({ where: { email: email } })
        if (userWithExistingEmail) {
            throw new Error('User with this email already existing. Please choose another email')
        };
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await prisma.user.create({ data: { password, email, userName } })
        res.status(200).json({
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

}