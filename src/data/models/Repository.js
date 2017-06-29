import DataType from 'sequelize';
import Model from '../sequelize';

const Repository = Model.define('Repository', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  repositoryId: {
    type: DataType.STRING(100),
  },

  name: {
    type: DataType.STRING(255),
  },

  description: {
    type: DataType.TEXT(),
  },

  webhookId: {
    type: DataType.STRING(255),
    defaultValue: null,
  },

  hasConfig: {
    type: DataType.BOOLEAN(),
    defaultValue: false,
  },

  isPrivate: {
    type: DataType.BOOLEAN(),
    defaultValue: false,
  },

  homepageUrl: {
    type: DataType.STRING(255),
  },

  language: {
    type: DataType.STRING(50),
  },

  repositoryCreatedAt: {
    type: DataType.DATE(),
  },

  userId: {
    type: DataType.UUID,
  },

  isActive: {
    type: DataType.BOOLEAN(),
    defaultValue: false,
  },
}, {
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: ['name', 'repositoryId', 'userId'] },
  ],
  // getterMethods: {
  //   config: function() {
  //     return this.getDataValue('config');
  //   }
  // },
  // setterMethods: {
  //   config: function() {}
  // }
});

export default Repository;
