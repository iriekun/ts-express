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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const genres_1 = __importDefault(require("./routes/genres"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.app = express_1.default();
// app.use(cors);
exports.app.use(body_parser_1.default.json);
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use(morgan_1.default('dev'));
// app.use(logging);
exports.app.use('/api/genres', genres_1.default);
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('connecting to db...');
        const connected = yield mongoose_1.default.connect('mongodb://localhost/vidly', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if (connected)
            console.log('db connected');
    }
    catch (error) {
        console.log(error);
    }
});
const port = process.env.PORT || 5000;
// export const start = async () => {
//   await connectToDb();
//   console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//   console.log(`env = ${app.get('env')}`);
//   app.listen(port, () => console.log(`server running on port ${port} ...`));
// };
exports.app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});
