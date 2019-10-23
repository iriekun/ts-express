"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./../config"));
const auth = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).end();
    }
    const token = bearer.split('Bearer ')[1].trim();
    if (!token)
        return res
            .status(401)
            .send('Access denied! No token provided! ')
            .end();
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.secrets.jwt);
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(400).send('Invalid token');
    }
};
exports.default = auth;
