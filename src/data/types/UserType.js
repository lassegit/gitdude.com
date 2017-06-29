import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLBoolean as BoolType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const UserType = new ObjectType({
  name: 'User',
  fields: {
    id: { type: new NonNull(ID) },
    gitId: { type: StringType },
    userName: { type: StringType },
    displayName: { type: StringType },
    location: { type: StringType },
    company: { type: StringType },
    accessToken: { type: StringType },
    email: { type: StringType },
    isActive: { type: BoolType },
    createdAt: { type: StringType },
    updatedAt: { type: StringType },
    deletedAt: { type: StringType },
  },
});

export default UserType;
