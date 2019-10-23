"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
exports.userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
exports.User = mongoose_1.models.User || mongoose_1.model('User', exports.userSchema);
exports.signUpSchema = {
    name: joi_1.default.string()
        .min(5)
        .max(50)
        .required(),
    email: joi_1.default.string()
        .min(5)
        .max(255)
        .required()
        .email(),
    password: new joi_password_complexity_1.default()
};
exports.loginSchema = {
    email: joi_1.default.string()
        .min(5)
        .max(255)
        .required()
        .email(),
    password: new joi_password_complexity_1.default()
};
