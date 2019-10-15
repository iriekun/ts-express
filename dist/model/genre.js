"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
exports.genreSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    }
});
exports.Genre = mongoose_1.models.Genre || mongoose_1.model('Genre', exports.genreSchema);
exports.joiSchema = {
    name: joi_1.default.string()
        .min(3)
        .required()
};
