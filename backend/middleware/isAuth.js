const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('No authenticated')
        error.statusCode = 401;
        throw error
    }
    const token = authHeader.split(' ')[1]; //Spliting value to get only token, not the Bearer thing
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'supersecretthing')
    } catch (error) {
        error.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}