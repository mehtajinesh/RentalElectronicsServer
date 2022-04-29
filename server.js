import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import session from 'express-session';
import cors from 'cors';
import bodyParser from "body-parser";
import homePageController from "./controllers/home-page-controller.js";
import cartController from "./controllers/cart-controller.js";
import searchController from "./controllers/search-controller.js";
import productController from "./controllers/product-controller.js";
const app = express();
app.use(session({
    resave: false, saveUninitialized: true,
    secret: 'secret key'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());


dotenv.config();
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING);
homePageController(app);
cartController(app);
searchController(app);
productController(app);
app.get('/', (request, response) => {
    response.send("Welcome to Rentronics");
});
app.listen(process.env.PORT || 4000)