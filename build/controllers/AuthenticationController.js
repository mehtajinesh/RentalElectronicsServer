"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_dao_1 = __importDefault(require("../daos/user-dao"));
const bcrypt = require('bcrypt');
const saltRounds = 10;
const AuthenticationController = (app) => {
    const userDao = user_dao_1.default.getInstance();
    const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("==> login");
        console.log("==> req.session");
        // @ts-ignore
        console.log(req.session);
        const user = req.body;
        const username = user.username;
        const password = user.password;
        console.log(password);
        const existingUser = yield userDao
            .findUserByEmail(username);
        const match = yield bcrypt.compare(password, existingUser.password);
        if (match) {
            existingUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        }
        else {
            res.sendStatus(403);
        }
    });
    const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("==> register");
        console.log("==> req.session");
        // @ts-ignore
        console.log(req.session);
        const newUser = req.body;
        const password = newUser.password;
        const hash = yield bcrypt.hash(password, saltRounds);
        newUser.password = hash;
        const existingUser = yield userDao
            .findUserByEmail(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        }
        else {
            const insertedUser = yield userDao
                .createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    });
    const profile = (req, res) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            res.json(profile);
        }
        else {
            res.sendStatus(403);
        }
    };
    const logout = (req, res) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    };
    app.post("/api/auth/login", login);
    app.post("/api/auth/register", register);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
};
exports.default = AuthenticationController;
