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
Object.defineProperty(exports, "__esModule", { value: true });
const genre_1 = require("./../model/genre");
const validation_1 = require("./../util/validation");
const mongoose_1 = require("mongoose");
exports.create = (model, joiSchema) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validation_1.validateInput(req.body, joiSchema);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        if (!mongoose_1.Types.ObjectId.isValid(req.body.genreId))
            return res.status(400).send('Invalid genre ID');
        const genre = yield genre_1.Genre.findById(req.body.genreId);
        if (!genre)
            return res.status(400).send('Invalid genre!');
        const doc = new model({
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            genre: {
                _id: genre._id,
                name: genre.name
            }
        });
        yield doc.save();
        res.status(200).json({ data: doc });
    }
    catch (e) {
        console.error(e);
        res.status(400).end();
    }
});
