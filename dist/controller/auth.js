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
const validation_1 = require("../util/validation");
const user_1 = require("../model/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.getCurrentUser = () => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.header.prototype.user);
    const user = yield user_1.User.findById(req.header.prototype.user).select('-password');
    res.status(200).json({ data: user });
});
exports.signup = () => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validation_1.validateInput(req.body, user_1.signUpSchema);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        let userModel = yield user_1.User.findOne({ email: req.body.email });
        if (userModel)
            return res.status(400).send('User already registered');
        const salt = yield bcrypt_1.default.genSalt(10);
        const password = yield bcrypt_1.default.hash(req.body.password, salt);
        userModel = yield user_1.User.create(Object.assign(Object.assign({}, req.body), { password }));
        const user = {
            name: userModel.name,
            email: userModel.email
        };
        const token = jwtSign(userModel._id);
        res
            .header('x-auth-token', token)
            .status(200)
            .json({ data: user });
    }
    catch (error) {
        console.log(error);
        res.status(400).end();
    }
});
exports.login = () => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validation_1.validateInput(req.body, user_1.loginSchema);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const userModel = yield user_1.User.findOne({ email: req.body.email });
        if (!userModel)
            return res.status(400).send('Invalid email or password');
        const validPassword = yield bcrypt_1.default.compare(req.body.password, userModel.password);
        if (!validPassword)
            return res.status(400).send('Invalid email or password');
        const token = jwtSign(userModel._id);
        res.status(200).json({ token });
    }
    catch (error) {
        console.log(error);
        res.status(400).end();
    }
});
const jwtSign = (id) => {
    //TODO : extract secret
    return jsonwebtoken_1.default.sign({ _id: id }, 'jwtPrivateKey');
};
