import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserController from "./controllers/user-controller";
dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING;// connect to the database
mongoose.connect(connectionString);

const app = express();
app.get('/hello', (req, res) => {res.send('Hello World!')})

UserController.getInstance(app);

app.listen(4000);