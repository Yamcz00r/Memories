const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

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
        const userWithExistingEmail = await prisma.user.find
    } catch (error) {

    }


}