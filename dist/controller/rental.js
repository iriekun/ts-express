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
const rental_1 = require("./../model/rental");
const movie_1 = require("./../model/movie");
const customer_1 = require("./../model/customer");
const mongoose_1 = require("mongoose");
exports.getAll = () => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield rental_1.Rental.find().sort('-dateOut'); //sort by date in descending order
        res.status(200).json({ data: doc });
    }
    catch (e) {
        console.error(e);
        res.status(400).end();
    }
});
exports.create = () => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validation_1.validateInput(req.body, rental_1.joiSchema);
    if (error)
        return res.status(400).send(error.details[0].message);
    // use mongodb session to achieve atomicity/transaction
    const session = yield mongoose_1.startSession();
    session.startTransaction();
    try {
        if (!mongoose_1.Types.ObjectId.isValid(req.body.customerId))
            return res.status(400).send('Invalid customer ID');
        const customer = yield customer_1.Customer.findById(req.body.customerId);
        if (!customer)
            return res.status(400).send('Invalid customer');
        if (!mongoose_1.Types.ObjectId.isValid(req.body.movieId))
            return res.status(400).send('Invalid movie ID'); // always pass session to find queries when the data is needed for the transaction session
        const movie = yield movie_1.Movie.findById(req.body.movieId).session(session);
        if (!movie)
            return res.status(400).send('Invalid movie!');
        if (movie.numberInStock == 0)
            return res.status(400).send('Movie is not in stock!');
        let rental = new rental_1.Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                _id: customer._id,
                dailyRentalRate: movie.dailyRentalRate,
                title: movie.title
            }
        });
        yield rental.save();
        movie.numberInStock--;
        yield movie.save();
        yield session.commitTransaction();
        res.status(200).json({ data: rental });
    }
    catch (error) {
        yield session.abortTransaction(); //roll back all operations in the transaction
        console.error(error);
        res.status(400).end();
    }
    finally {
        session.endSession();
    }
});
