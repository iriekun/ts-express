import express, { Application } from 'express';
import logging from './middleware/logger';
import morgan from 'morgan';
import genreRouter from './routes/genres';
import mongoose from 'mongoose';

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(logging);
app.use('/api/genres', genreRouter);

const connectToDb = async () => {
  try {
    console.log('connecting to db...');
    const connected = await mongoose.connect('mongodb://localhost/vidnet', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
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
