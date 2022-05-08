import User from '../models/user';
class UsersRepository {

    constructor() {}
  
    findAll() {
      return User.findAll({
        attributes: {
          exclude: ['id', 'password']
        }
      });
    }
  
    findById(id: any) {
      return User.findByPk(id, {
        attributes: {
          exclude: ['id', 'password']
        }
      });
    }
  
    findOne = (username: string) => {
      const user =  User.findOne({
        where: { username: username },
      });
      return user;
    }
  
    save(user: any) {
      return User.build(user).save()
        .then((user: any) => user)
        .catch((error: any) => new Promise((resolve, reject) => reject(error)));
    }
  
    exists(id: any) {
      return User.count({
        where: { id: id }
      });
    }
  
  }

  export default new UsersRepository();