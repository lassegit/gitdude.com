import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import userRepos from './queries/userRepos';
import repoAdd from './mutations/repoAdd';
import repoStatus from './mutations/repoStatus';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      userRepos,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      repoAdd,
      repoStatus,
    }
  }),
});

export default schema;
