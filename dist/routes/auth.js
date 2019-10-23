"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const auth_2 = __importDefault(require("./../middleware/auth"));
const router = express_1.Router();
router.use('/', auth_2.default);
router.route('/signup').post(auth_1.signup());
router.route('/login').post(auth_1.login());
router.route('/me').get(auth_1.getCurrentUser());
exports.default = router;
