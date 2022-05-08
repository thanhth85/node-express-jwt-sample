import express from 'express';
import ApiV1Router from './api/v1'
import AuthenticationRouter from './authentication.router';
import SignupRouter from './signup.router';
import JwtMiddleware from '../middleware/jwt.middleware';

const Router = express.Router();
// Create an API: accessing by admin and customer
Router.use('/api', JwtMiddleware.verify, ApiV1Router);
// Create an API: sign in an account both admin and customer
Router.use('/signin', AuthenticationRouter);
// Create an API: sign up an account both admin and customer
Router.use('/signup', SignupRouter);

export default Router;