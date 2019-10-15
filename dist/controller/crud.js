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
const validation_1 = require("./../util/validation");
exports.getAll = (model) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield model.find();
        res.status(200).json({ data: doc });
    }
    catch (e) {
        console.error(e);
        res.status(400).end();
    }
});
// prettier-ignore
exports.create = (model, schema) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validation_1.validateInput(req.body, schema);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const doc = new model(Object.assign({}, req.body));
        yield doc.save();
        res.status(200).json({ data: doc });
    }
    catch (e) {
        console.error(e);
        res.status(400).end();
    }
});
// prettier-ignore
exports.update = (model, schema) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validation_1.validateInput(req.body, schema);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const doc = yield model.findByIdAndUpdate(req.params.id, ...req.body, {
            new: true
        });
        if (!doc)
            return res.status(404).send('Genre with the given ID is not found!');
        res.status(200).json({ data: doc });
    }
    catch (e) {
        console.error(e);
        res.status(400).end();
    }
});
// prettier-ignore
exports.remove = (model) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield model.findByIdAndRemove(req.params.id);
        if (!doc)
            return res.status(404).send('The genre with the given ID was not found.');
        res.status(200).json({ data: doc });
    }
    catch (e) {
        console.error(e);
        res.status(400).end();
    }
});
// prettier-ignore
exports.getById = (model) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield model.findById(req.params.id);
        if (!doc)
            return res.status(404).send('The genre with the given ID was not found.');
        res.send(doc);
    }
    catch (e) {
        console.error(e);
        res.status(400).end();
    }
});
