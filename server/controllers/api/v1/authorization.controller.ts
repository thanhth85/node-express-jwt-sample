// we import express to add types to the request/response objects from our controller functions
import { Get, Route, Tags } from "tsoa";
import express from 'express';

@Route("api/v1")
@Tags("User")
class AuthorizationController {

    constructor() {}
    @Get("/admin")
    getAdmin = (req: express.Request, res:express.Response) => {
        return res.status(200).send({ message: ' Hello Word, admin'});
    }
    @Get("/customer")
    getCustomer =(req: express.Request, res:express.Response) => {
        return res.status(200).send({ message: ' Hello Word, customer'});
    }
}

export default new AuthorizationController();