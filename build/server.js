"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
const AuthenticationController_1 = __importDefault(require("./controllers/AuthenticationController"));
const SessionController_1 = __importDefault(require("./controllers/SessionController"));
dotenv_1.default.config();
const session = require("express-session");
const connectionString = process.env.DB_CONNECTION_STRING; // connect to the database
mongoose_1.default.connect(connectionString + "");
const app = (0, express_1.default)();
let sess = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production",
    }
};
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1); // trust first proxy sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));
app.use(express_1.default.json());
app.get('/hello', (req, res) => { res.send('Hello World!'); });
user_controller_1.default.getInstance(app);
(0, SessionController_1.default)(app);
(0, AuthenticationController_1.default)(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
