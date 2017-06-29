import {
  GraphQLString as StringType,
  GraphQLBoolean as BoolType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import RepositoryType from '../types/RepositoryType';
import { Repository, User } from '../models';

const repoAdd = {
  type: RepositoryType,
  args: {
    repositoryId: { type: new NonNull(StringType) },
    name: { type: StringType },
    description: { type: StringType },
    language: { type: StringType },
    isPrivate: { type: BoolType },
    homepageUrl: { type: StringType },
    repositoryCreatedAt: { type: StringType },
  },
  async resolve({ request }, args) {
    if (request.isAuthenticated()) {
      args.userId = request.user.id;
      let repo = await Repository.create(args);
      return repo;
    }
    return;
  },
};

export default repoAdd;
