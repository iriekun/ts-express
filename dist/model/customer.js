"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
exports.customerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        required: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
exports.Customer = mongoose_1.models.Customer || mongoose_1.model('Customer', exports.customerSchema);
//prettier-ignore
exports.joiSchema = {
    name: joi_1.default.string().min(3).required(),
    isGold: joi_1.default.boolean(),
    phone: joi_1.default.string().min(3).required()
};
