import { Server } from "server";
import { makeExecutableSchema } from "tool";
import { GraphQLHTTP } from "http";
import { gql } from "gql";

import { addStudent, delStudent, getStudent, updateStudent } from "./kv.js";

const typeDefs = gql`
  type Query {
    getStudent(class: String!, rollno: Int!): Student
  }

  type Mutation {
    addStudent(input: StudentInput!): Student
    delStudent(class: String!, rollno: Int!): Student
    updateStudent(input: StudentUpdate!): Student
  }

  input StudentInput {
    rollno: Int!
    name: String!
    age: Int!
    address: String!
    class: String!
    gender: String!
  }

  input StudentUpdate {
    rollno: Int!
    class: String!
    name: String
    age: Int
    address: String
    gender: String
  }

  type Student {
    rollno: Int
    name: String
    age: Int
    address: String
    class: String
    gender: String
    }
`;

const resolvers = {
  Query: {
    getStudent: async (_, { class: classname, rollno }) => {
      return await getStudent(classname, rollno);
    },
  },
  Mutation: {
    addStudent: async (_, { input }) => {
      return await addStudent(input);
    },
    delStudent: async (_, { class: classname, rollno }) => {
      return await delStudent(classname, rollno);
    },
    updateStudent: async (_, { input }) => {
      return await updateStudent(input);
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url);

    return pathname === "/graphql"
      ? await GraphQLHTTP({ schema, graphiql: true })(req)
      : new Response("Not Found", { status: 404 });
  },
  port: 8000, // port of your choice
});
server.listenAndServe();
