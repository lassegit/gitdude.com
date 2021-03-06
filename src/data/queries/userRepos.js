import {
  GraphQLID as ID,
  GraphQLList
}from 'graphql';
import RepositoryType from '../types/RepositoryType';
import { Repository } from '../models';

const userRepos = {
  type: new GraphQLList(RepositoryType),
  async resolve({ request }) {

    if (request.isAuthenticated()) {

      const repos = await Repository.findAll({
        where: { userId: request.user.id },
        limit: 150,
        order: 'createdAt DESC',
      });

      return repos;
    }

    return;

  },
};

export default userRepos;
