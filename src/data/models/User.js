import DataType from 'sequelize';
import Model from '../sequelize';

const User = Model.define('User', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  gitId: {
    type: DataType.STRING(100),
  },

  userName: {
    type: DataType.STRING(255),
  },

  displayName: {
    type: DataType.STRING(255),
  },

  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
  },

  location: {
    type: DataType.STRING(255),
  },

  company: {
    type: DataType.STRING(255),
  },

  accessToken: {
    type: DataType.STRING(255),
  },

  isActive: {
    type: DataType.BOOLEAN(),
    defaultValue: true,
  },
}, {
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: ['email', 'gitId'] },
  ],
});

export default User;
