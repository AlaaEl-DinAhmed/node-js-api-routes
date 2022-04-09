import express from 'express';
import { check } from 'express-validator';
import {
  createPlace,
  deletePlace,
  getPlaceById,
  getPlaceForUserById,
  updatePlace,
} from '../controllers/place-controllers.js';

const placesRouter = express.Router();

placesRouter.get('/:id', getPlaceById);

placesRouter.get('/user/:id', getPlaceForUserById);

placesRouter.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  createPlace
);

placesRouter.patch('/:id', updatePlace);

placesRouter.delete('/:id', deletePlace);

export default placesRouter;
