import express from 'express';
import applicationController   from "./controllers/application-controller.js";
const app = express();
let session = require('express-session')
app.use(session({
    resave: false, saveUninitialized: true,
    secret: 'secret key'
}));
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

applicationController(app);
app.listen(4000);