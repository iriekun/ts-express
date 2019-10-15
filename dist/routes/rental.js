"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rental_1 = require("../controller/rental");
const crud_1 = require("../controller/crud");
const rental_2 = require("../model/rental");
const router = express_1.Router();
// /api/genre
router
    .route('/')
    .get(rental_1.getAll())
    .post(rental_1.create());
router.route('/:id').get(crud_1.getById(rental_2.Rental));
exports.default = router;
