const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
app.use(express.json());



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes)

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


