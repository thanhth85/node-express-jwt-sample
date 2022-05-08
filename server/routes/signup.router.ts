import express from 'express';

import SignupController from '../controllers/signup.controller'

const SignupRouter = express.Router();

SignupRouter.post('/', SignupController.create);


export default SignupRouter;