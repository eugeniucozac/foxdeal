import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Task {
    id: ID
    name: String!
  }

  input TaskInput {
    name: String!
  }

  type Query {
    getTasks: [Task]
  }

  type Mutation {
    addTask(task: TaskInput): Task
    removeTask(id: ID!): Task
    updateTask(id: ID!, task: TaskInput!): Task
  }
`;
