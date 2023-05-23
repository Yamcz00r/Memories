const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
};


app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes)
app.use('/content', postRoutes)

app.use((err, req, res, next) => {
    const { statusCode = 500, message, data } = err;
    res.status(statusCode).json({
        message,
        data
    })
});

app.listen(8080, () => {
    console.log('Server is Running!')
})





