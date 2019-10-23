"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_1 = require("../model/customer");
const crud_1 = require("../controller/crud");
const auth_1 = __importDefault(require("./../middleware/auth"));
const router = express_1.Router();
router.use('/', auth_1.default);
// /api/genre
router
    .route('/')
    .get(crud_1.getAll(customer_1.Customer))
    .post(crud_1.create(customer_1.Customer, customer_1.joiSchema));
// /api/genre/:id
router
    .route('/:id')
    .get(crud_1.getById(customer_1.Customer))
    .put(crud_1.update(customer_1.Customer, customer_1.joiSchema))
    .delete(crud_1.remove(customer_1.Customer));
exports.default = router;
