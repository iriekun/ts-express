"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'complete', 'pastdue'],
        default: 'active'
    }
}, { timestamps: true });
