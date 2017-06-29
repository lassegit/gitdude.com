import DataType from 'sequelize';
import Model from '../sequelize';

const Commit = Model.define('Commit', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  name: {
    type: DataType.STRING(255),
  },

  linted: {
    type: DataType.JSON(),
  },

  branch: {
    type: DataType.STRING(255),
  },

  commitId: {
    type: DataType.STRING(255),
  },

  treeId: {
    type: DataType.STRING(255),
  },

  commentId: {
    type: DataType.STRING(255),
  },

  repositoryId: {
    type: DataType.STRING(100),
  },

  userId: {
    type: DataType.UUID,
  },
}, {
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: ['repositoryId', 'userId'] },
  ],
});

export default Commit;
