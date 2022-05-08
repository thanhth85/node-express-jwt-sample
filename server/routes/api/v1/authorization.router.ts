import express from 'express';
import AuthorizationController from '../../../controllers/api/v1/authorization.controller'
import  JwtMiddleWare from '../../../middleware/jwt.middleware';

const AuthorizationRouter = express.Router();

AuthorizationRouter.get('/admin', JwtMiddleWare.hasRole('ADMIN'), AuthorizationController.getAdmin);
AuthorizationRouter.get('/customer', JwtMiddleWare.hasRole('USER'),AuthorizationController.getCustomer);

export default AuthorizationRouter;