"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const genre_1 = require("./genre");
exports.movieSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    numberInStock: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    genre: {
        type: genre_1.genreSchema,
        required: true
    }
});
exports.Movie = mongoose_1.default.models.Movie || mongoose_1.default.model('Movie', exports.movieSchema);
exports.joiSchema = {
    title: joi_1.default.string()
        .min(5)
        .max(50)
        .required(),
    numberInStock: joi_1.default.number().required(),
    dailyRentalRate: joi_1.default.number().required(),
    genreId: joi_1.default.string().required()
};
