import {
  GraphQLString as StringType,
  GraphQLBoolean as BoolType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import RepositoryType from '../types/RepositoryType';
import { Repository, User } from '../models';
import githubWebhook from '../githubWebhook';

const repoStatus = {
  type: RepositoryType,
  args: {
    id: { type: new NonNull(StringType) },
    isActive: { type: BoolType, },
  },
  async resolve({ request }, args) {

    if (request.isAuthenticated()) {
      const webHookRes = await githubWebhook(request.user.id, args.id);

      if (webHookRes.errors) {
        throw new Error(webHookRes.errors[0].message);
      }

      const repo = await Repository.update({
        isActive: args.isActive,
        webhookId: webHookRes.id ? webHookRes.id : null,
      }, { where: { id: args.id } });

      return args;
    }

    return;

  },
};

export default repoStatus;
