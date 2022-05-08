import { Sequelize } from 'sequelize';
import Logger from '../libs/logger'

const  sequelize = new Sequelize({
  "storage": "./database/db/dev.sqlite",
  "dialect": "sqlite"
});

sequelize
  .authenticate()
  .then(() => {
    Logger.debug('Connection has been established successfully.');
  })
  .catch(err => {
    Logger.debug(`Unable to connect to the database: ${err}`);
  });
export { Sequelize, sequelize };