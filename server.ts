import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserController from "./controllers/user-controller";
import AuthenticationController from "./controllers/AuthenticationController";
import SessionController from "./controllers/SessionController";
dotenv.config();
const session = require("express-session");

const connectionString = process.env.DB_CONNECTION_STRING;// connect to the database
mongoose.connect(connectionString + "");

const app = express();

let sess = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  saveUninitialized: true,
  resave: true,
  cookie: {
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
    secure: process.env.NODE_ENV === "production",
  }
}

if (process.env.ENV === 'PRODUCTION') {
  app.set('trust proxy', 1) // trust first proxy sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(express.json());

app.get('/hello', (req, res) => {res.send('Hello World!')})

UserController.getInstance(app);
SessionController(app);
AuthenticationController(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);