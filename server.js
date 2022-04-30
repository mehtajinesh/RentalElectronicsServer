require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const userDao = require('./database/user/user-dao');

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false,
        maxAge: 60000 * 30,
    },
}));

app.use(express.json());


const userController = require('./database/user/user-controller');
const authController = require('./database/auth/auth-controller');


userController(app);
authController(app);

app.listen(4000);
