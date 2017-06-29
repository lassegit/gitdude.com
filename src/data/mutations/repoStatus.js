import {
  GraphQLString as StringType,
  GraphQLBoolean as BoolType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import RepositoryType from '../types/RepositoryType';
import { Repository, User } from '../models';
import { updateWebhook } from '../webhook.js';

const repoStatus = {
  type: RepositoryType,
  args: {
    id: { type: new NonNull(StringType) },
    isActive: { type: BoolType, },
  },
  async resolve({ request }, args) {
    if (request.isAuthenticated()) {
      const webhookId = await updateWebhook(request.user.id, args.id, args.isActive);

      const repo = await Repository.update({
        isActive: args.isActive,
        webhookId: webhookId,
      }, { where: { id: args.id } });
      return args;
    }
    return;
  },
};

export default repoStatus;
