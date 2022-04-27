require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const userDao = require('./dao/user-dao');

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING);

app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_KEY,
    cookie: {secure: true},
}));


const userController = require('./controllers/user-controller');
const cartController = require('./controllers/cart-controller');

userController(app);
cartController(app);

app.listen(4000);
