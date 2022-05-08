import { Model, Optional, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '.';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  role: string;
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>{
  id: number;
  password: string;
  username: string;
  role: string;
}
   
const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    username: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Users',
  }
);

// the defined model is the class itself
// console.log(User === sequelize.models.User); // true
export default User;