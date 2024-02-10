import { Types } from "mongoose";
import { Tasks } from "../db";
import { UserInputError, ApolloError } from 'apollo-server-errors';

const handleError = (message, code = "INTERNAL_SERVER_ERROR") => {
  throw new ApolloError(message, code);
};

const validateTask = (task) => {
  if (!task || typeof task !== 'object') {
    throw new UserInputError('Invalid task input');
  }
  if (!task.name || typeof task.name !== 'string' || task.name.trim() === '') {
    throw new UserInputError('Task name is required');
  }
};

const checkDuplicateTask = async (name, id?) => {
  const query: { name: string; _id?: object; } = { name };
  if (id) {
    query._id = { $ne: id };
  }
  const existingTask = await Tasks.findOne(query);
  if (existingTask) {
    throw new UserInputError('Task already exists');
  }
}

const getTasks = async () => {
  try {
    return await Tasks.find();
  } catch (err) {
    handleError('Failed to retrieve tasks');
  }
};

const addTask = async (_, { task }) => {
  try {
    validateTask(task);
    await checkDuplicateTask(task.name);
    const newTask = new Tasks(task);
    return await newTask.save();
  } catch (err) {
    if (err instanceof UserInputError) {
      throw err;
    }
    handleError(err.message, err.extensions.code);
  }
};

const removeTask = async (_, { id }) => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new UserInputError('Invalid ID format');
    } 
    const deletedTask = await Tasks.findByIdAndDelete(id);
    if (!deletedTask) {
      throw new UserInputError('Task not found');
    }
    return deletedTask;
  } catch (err) {
    if (err instanceof UserInputError) {
      throw err;
    }
    handleError(err.message, err.extensions.code);
  }
};

const updateTask = async (_, { id, task }) => {
  try {
    validateTask(task);
    await checkDuplicateTask(task.name, id);
    const options = { new: true };
    const updatedTask = await Tasks.findByIdAndUpdate(id, task, options);
    if (!updatedTask) {
      throw new UserInputError('Task not found');
    }
    return updatedTask;
  } catch (err) {
    if (err instanceof UserInputError) {
      throw err;
    }
    handleError(err.message, err.extensions.code);
  }
};

export const resolvers = {
  Query: {
    getTasks,
  },
  Mutation: {
    addTask,
    removeTask,
    updateTask,
  },
};