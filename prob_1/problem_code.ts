import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";

const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }
  type Mutation {
    createUser(name: String!): User!
  }
`;

const resolvers = {
  Mutation: {
    createUser: async (_: any, { name }: { name: string }) => {
      // Create a new user in the database
      const user = prisma.user.create({ data: { name } });
      return user;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server running at ${url}`));
