import express from 'express';

import AuthenticationController from '../controllers/authentication.controller'

const AuthenticationRouter = express.Router();

AuthenticationRouter.post('/', AuthenticationController.authenticate);


export default AuthenticationRouter;