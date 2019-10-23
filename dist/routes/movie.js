"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Movie_1 = require("../model/Movie");
const crud_1 = require("../controller/crud");
const movie_1 = require("../controller/movie");
const auth_1 = __importDefault(require("./../middleware/auth"));
const router = express_1.Router();
router.use('/', auth_1.default);
// /api/genre
router
    .route('/')
    .get(crud_1.getAll(Movie_1.Movie))
    .post(movie_1.create(Movie_1.Movie, Movie_1.joiSchema));
// /api/genre/:id
router
    .route('/:id')
    .get(crud_1.getById(Movie_1.Movie))
    .put(crud_1.update(Movie_1.Movie, Movie_1.joiSchema))
    .delete(crud_1.remove(Movie_1.Movie));
exports.default = router;
