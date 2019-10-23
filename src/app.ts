import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import genreRouter from './routes/genres';
import customerRouter from './routes/customer';
import movieRouter from './routes/movie';
import rentalRouter from './routes/rental';
import authRouter from './routes/auth';
import config from './config';

const app: express.Application = express();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined');
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/api/genre', genreRouter);
app.use('/api/customer', customerRouter);
app.use('/api/movie', movieRouter);
app.use('/api/rental', rentalRouter);
app.use('/', authRouter);

const connectToDb = async () => {
  try {
    console.log(`connecting to db ${config.db}`);
    const connected = await mongoose.connect(`mongodb://${config.db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
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

export default app;
