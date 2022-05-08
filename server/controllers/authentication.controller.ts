import { Post, Route, Tags,  } from "tsoa";
import express from 'express';
import bcrypt from 'bcrypt';
import UsersRepository from '../repositories/users.repository'
import JwtService from '../services/jwt.service';

@Route("signin")
@Tags("User")
class AuthenicationController {
    constructor() {}

    @Post("/")
    authenticate = (req: express.Request, res:express.Response) => {
        const username = req.body.username;
        const password = req.body.password;
        let user = UsersRepository.findOne(username);
        let valid = user.then((user) => {
          if (user){
            return bcrypt.compare(password, user.password);
          } else {
            throw new Error('Invalid username/password');
          }

        });
       
        return Promise.all([user, valid])
          .then(([user, valid]) => {
            if(valid && user) {
              let payload = { user: user.username, role: user.role };
              return res.status(200).send({ token: JwtService.sign(payload)});
            } else {
              throw new Error('Invalid username/password');
            }
          })
          .catch((error) => res.status(401).send({ error: 'Invalid username/password' }));
    }
}

export default new AuthenicationController();