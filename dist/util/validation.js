"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi_1 = __importDefault(require("Joi"));
// prettier-ignore
exports.validateInput = (model, joiSchema) => {
    return Joi_1.default.validate(model, joiSchema);
};
