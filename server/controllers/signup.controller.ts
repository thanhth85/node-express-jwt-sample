import { Post, Route, Tags } from "tsoa";
import express from 'express';
import bcrypt from 'bcrypt'
import UsersRepository from '../repositories/users.repository'

@Route("signup")
@Tags("User")
class SignupController {
    private readonly _saltRounds = 12
    constructor() {}
    @Post("/")
    create = (req: express.Request, res:express.Response) => {
      return bcrypt.hash(req.body.password, this._saltRounds)
            .then(hash => {
              let user = { username: req.body.username, password: hash, role:req.body.role }
              return UsersRepository.save(user)
              .then((user) => UsersRepository.findById(user.dataValues.id))
              .then((user) => res.status(201).send(user))
              .catch((error) => res.status(400).send({ error: 'Error creating new user' }));
            })
    }
  
}

export default new SignupController();