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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const genres_1 = __importDefault(require("./routes/genres"));
const customer_1 = __importDefault(require("./routes/customer"));
const movie_1 = __importDefault(require("./routes/movie"));
const rental_1 = __importDefault(require("./routes/rental"));
const auth_1 = __importDefault(require("./routes/auth"));
const config_1 = __importDefault(require("./config"));
const app = express_1.default();
if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    process.exit(1);
}
app.use(express_1.json());
app.use(express_1.urlencoded({ extended: true }));
app.use(morgan_1.default('dev'));
app.use('/api/genre', genres_1.default);
app.use('/api/customer', customer_1.default);
app.use('/api/movie', movie_1.default);
app.use('/api/rental', rental_1.default);
app.use('/', auth_1.default);
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`connecting to db ${config_1.default.db}`);
        const connected = yield mongoose_1.default.connect(`mongodb://${config_1.default.db}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        if (connected)
            console.log('db connected');
    }
    catch (error) {
        console.log(error);
    }
});
const port = process.env.PORT || 5000;
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDb();
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`env = ${app.get('env')}`);
    console.log(`server running on port ${port}`);
}));
exports.default = app;
