import { Types } from "mongoose";
import { Tasks } from "../db";
import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    getTasks: async (root) => {
      try {
        const tasks = await Tasks.find();
        return tasks;
      } catch (err) {
        throw new GraphQLError('Failed to retrieve tasks');
      }
    },
  },
  Mutation: {
    addTask: async (root, { task }) => {
      try {
        if (!task.name) {
          throw new GraphQLError('Task name is required', {
            extensions: {
              code: "INVALID_INPUT"
            }
          });
        }

        const existingTask = await Tasks.findOne({ name: task.name });
        if (existingTask) {
          throw new GraphQLError('Task already exists', {
            extensions: {
              code: "ALREADY_EXISTS"
            }
          });
        }

        const newTask = new Tasks(task);
        const savedTask = await newTask.save();
        return savedTask;
      } catch (err) {
        if (err.extensions && err.extensions.code) {
          throw err;
        }

        throw new GraphQLError('Failed to add new task', {
          extensions: {
            code: "INTERNAL_SERVER_ERROR"
          }
        });
      }
    },
    removeTask: async (root, { id }) => {
      try {
        if (!Types.ObjectId.isValid(id)) {
          throw new GraphQLError('Invalid ID format', {
            extensions: {
              code: "BAD_USER_INPUT"
            }
          });
        } 
      
        const deletedTask = await Tasks.findByIdAndDelete(id);
        if (!deletedTask) {
          throw new GraphQLError('Task not found', {
            extensions: {
              code: "NOT_FOUND"
            }
          });
        }
        return deletedTask;
      } catch (err) {
        if (err.extensions && err.extensions.code) {
          throw err;
        }

        throw new GraphQLError('Failed to remove task', {
          extensions: {
            code: "INTERNAL_SERVER_ERROR"
          }
        });
      }
    },
    updateTask: async (root, { id, task }) => {
      try {
        if (!task.name) {
          throw new GraphQLError('Task name is required', {
            extensions: {
              code: "INVALID_INPUT"
            }
          });
        }

        const existingTask = await Tasks.findOne({ name: task.name, _id: { $ne: id } });
        if (existingTask) {
          throw new GraphQLError('Task already exists', {
            extensions: {
              code: "ALREADY_EXISTS"
            }
          });
        }

        const options = { new: true };
        const updatedTask = await Tasks.findByIdAndUpdate(id, task, options);
        if (!updatedTask) {
          throw new GraphQLError('Task not found', {
            extensions: {
              code: "NOT_FOUND"
            }
          });
        }
        return updatedTask;
      } catch (err) {
        if (err.extensions && err.extensions.code) {
          throw err;
        }

        throw new GraphQLError('Failed to update task', {
          extensions: {
            code: "INTERNAL_SERVER_ERROR"
          }
        });
      }
    }
  },
};
