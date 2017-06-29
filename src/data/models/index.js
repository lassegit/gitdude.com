import sequelize from '../sequelize';
import User from './User';
import Repository from './Repository';
import Commit from './Commit';

Repository.belongsTo(User, {
  as:'user'
});

User.hasMany(Repository, {
  foreignKey: 'userId',
  as: 'repositories',
});

User.hasMany(Commit, {
  foreignKey: 'userId',
  as: 'commits',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, Repository, Commit };
