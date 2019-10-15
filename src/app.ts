import express, { Application, json, urlencoded } from 'express';
import auth from './middleware/auth';
import morgan from 'morgan';
import mongoose from 'mongoose';
import genreRouter from './routes/genres';
import customerRouter from './routes/customer';
import movieRouter from './routes/movie';
import rentalRouter from './routes/rental';
import authRouter from './routes/auth';

export const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/api/genre', auth, genreRouter);
app.use('/api/customer', customerRouter);
app.use('/api/movie', movieRouter);
app.use('/api/rental', rentalRouter);
app.use('/', auth, authRouter);

const connectToDb = async () => {
  try {
    console.log('connecting to db...');
    const connected = await mongoose.connect(
      'mongodb://localhost/vidnet:27017?replicaSet=rsName',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );
    if (connected) console.log('db connected');
  } catch (error) {
    console.log(error);
  }
};

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await connectToDb();
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`env = ${app.get('env')}`);
  console.log(`server running on port ${port}`);
});
