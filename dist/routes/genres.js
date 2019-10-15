"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genre_1 = require("./../model/genre");
const crud_1 = require("../controller/crud");
const router = express_1.Router();
// /api/genre
router
    .route('/')
    .get(crud_1.getAll(genre_1.Genre))
    .post(crud_1.create(genre_1.Genre, genre_1.joiSchema));
// /api/genre/:id
router
    .route('/:id')
    .get(crud_1.getById(genre_1.Genre))
    .put(crud_1.update(genre_1.Genre, genre_1.joiSchema))
    .delete(crud_1.remove(genre_1.Genre));
exports.default = router;
