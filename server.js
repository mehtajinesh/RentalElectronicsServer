import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import session from "express-session";
import userController from "./controllers/user-controller.js";
import authController from "./controllers/auth-controller.js";
import profileController from "./controllers/profile-controller.js";
import productController from "./controllers/product-controller.js";
import categoryController from "./controllers/category-controller.js"

const app = express();

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
// mongoose.connect(CONNECTION_STRING);

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
    maxAge: 60000,
  },
}));

app.use(express.json());

userController(app);
authController(app);
profileController(app);
productController(app);
categoryController(app);

app.listen(4000);
