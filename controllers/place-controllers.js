import { validationResult } from 'express-validator';
import HttpError from '../models/http-error.js';
import Place from '../schemas/place.js';

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.id;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, could not find a place.'
    );
    return next(error);
  }
  if (!place) {
    const error = new HttpError(400, 'No places found.');
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlaceForUserById = async (req, res, next) => {
  const userId = req.params.id;
  let place;

  try {
    place = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, could not find a place.'
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(400, 'No places found for this user.');
    return next(error);
  }

  res.json({ place });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    throw new HttpError(422, 'Invalid inputs.');
  }
  const { title, description, address, image, creator } = req.body;
  const createdPlace = new Place({
    title,
    description,
    address,
    image,
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      500,
      'Creating place failed, please try again.'
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const placeId = req.params.id;
  const { title, description } = req.body;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, could not update place.'
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {}

  res.status(200).json({ place });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.id;
  let place;
  try {
    place = await Place.findById(placeId);
    place.remove();
  } catch (err) {
    const error = new HttpError(500, 'Something went wrong, could not delete.');
    return next(error);
  }

  res.status(200).json({ message: 'Deleted.' });
};

export {
  getPlaceById,
  getPlaceForUserById,
  createPlace,
  updatePlace,
  deletePlace,
};
