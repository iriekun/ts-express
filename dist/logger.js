"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    console.log("Logging...");
    next();
};
exports.default = logger;
