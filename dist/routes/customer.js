"use strict";
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_1 = require("../model/customer");
const crud_1 = require("../controller/crud");
const router = express_1.Router();
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
