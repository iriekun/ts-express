"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const router = express_1.Router();
router.route('/signup').post(auth_1.signup());
router.route('/login').post(auth_1.login());
router.route('/me').post(auth_1.getCurrentUser());
exports.default = router;
