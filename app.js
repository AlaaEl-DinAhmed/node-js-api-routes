import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import HttpError from './models/http-error.js';
import placesRouter from './routes/places.js';
import userRouter from './routes/users.js';

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRouter);

app.use('/api/users', userRouter);

app.use((req, res, next) => {
  throw new HttpError(404, 'Not found.');
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred.' });
});

mongoose
  .connect(
    'mongodb+srv://alaamu:alaa1234@cluster0.jyrd2.mongodb.net/learningNodeJs?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
