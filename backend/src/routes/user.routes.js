import express from 'express';
const userRouter = express.Router();
import { getUser, logout, signIn, signUp } from '../controllers/user.controller.js';

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.delete('/logout', logout);
userRouter.get('/profile', getUser);

export default userRouter;