import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLBoolean as BoolType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const RepositoryType = new ObjectType({
  name: 'Repository',
  fields: {
    id: { type: new NonNull(ID) },
    repositoryId: { type: StringType },
    name: { type: StringType },
    description: { type: StringType },
    webhookId: { type: StringType },
    hasConfig: { type: BoolType },
    isPrivate: { type: BoolType },
    homepageUrl: { type: StringType },
    language: { type: StringType },
    isActive: { type: BoolType },
    repositoryCreatedAt: { type: StringType },
    userId: { type: StringType },
    createdAt: { type: StringType },
    updatedAt: { type: StringType },
    deletedAt: { type: StringType },
  },
});

export default RepositoryType;
