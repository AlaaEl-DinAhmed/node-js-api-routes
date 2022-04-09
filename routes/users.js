import express from 'express';
import { getUsers, logIn, signUp } from '../controllers/user-controllers.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.post('/signup', signUp);

userRouter.post('/login', logIn);

export default userRouter;
