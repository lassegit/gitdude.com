import { GraphQLID as ID } from 'graphql';
import UserType from '../types/UserType';
import User from '../models/User';

const me = {
  type: UserType,
  async resolve({ request }) {
    if (request.isAuthenticated()) {
      let user = await User.findById(request.user.id);
      return user.dataValues;
    }
    return;
  },
};

export default me;
