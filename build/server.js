"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
dotenv_1.default.config();
const connectionString = process.env.DB_CONNECTION_STRING; // connect to the database
mongoose_1.default.connect(connectionString);
const app = (0, express_1.default)();
app.get('/hello', (req, res) => { res.send('Hello World!'); });
user_controller_1.default.getInstance(app);
app.listen(4000);
