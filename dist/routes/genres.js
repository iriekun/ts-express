"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const controller = (req, res) => {
    res.send({ message: 'hello' });
};
const router = express_1.Router();
const Genre = mongoose_1.default.model('Genre', new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));
const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' }
];
router.get('/', (req, res) => {
    res.send(genres);
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`req ${req.body}`);
    const { error } = validateGenre(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    // const genre = {
    //   id: genres.length + 1,
    //   name: req.body.name
    // };
    // genres.push(genre);
    console.log(req.body.name);
    let genre = new Genre({ name: req.body.name });
    console.log(`genre = ${genre}`);
    genre = yield genre.save();
    res.status(200).json({ message: 'added' });
}));
router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre)
        return res.status(404).send('The genre with the given ID was not found.');
    const { error } = validateGenre(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);
});
router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre)
        return res.status(404).send('The genre with the given ID was not found.');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});
router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre)
        return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});
function validateGenre(genre) {
    const schema = {
        name: joi_1.default.string()
            .min(3)
            .required()
    };
    console.log(`joi - ${genre}`);
    return joi_1.default.validate(genre, schema);
}
exports.default = router;
