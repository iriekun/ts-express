"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rental_1 = require("../controller/rental");
const crud_1 = require("../controller/crud");
const rental_2 = require("../model/rental");
const auth_1 = __importDefault(require("./../middleware/auth"));
const router = express_1.Router();
router.use('/', auth_1.default);
// /api/genre
router
    .route('/')
    .get(rental_1.getAll())
    .post(rental_1.create());
router.route('/:id').get(crud_1.getById(rental_2.Rental));
exports.default = router;
