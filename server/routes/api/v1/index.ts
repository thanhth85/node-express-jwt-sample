import express from 'express';
import AuthorizationRouter from './authorization.router'

const ApiV1Router = express.Router();

ApiV1Router.use('/v1', AuthorizationRouter);

export default ApiV1Router;