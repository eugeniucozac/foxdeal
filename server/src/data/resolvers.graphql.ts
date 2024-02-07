import { Tasks } from "../db";

export const resolvers = {
  Query: {
    getTasks: async (root) => {
      try {
        const tasks = await Tasks.find();
        return tasks;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addTask: async (root, { task }) => {
      try {
        const newTask = new Tasks(task);
        const savedTask = await newTask.save();
        return savedTask;
      } catch (err) {
        throw new Error(err);
      }
    },
    removeTask: async (root, { id }) => {
      try {
        const deletedTask = await Tasks.findByIdAndDelete(id);
        if (!deletedTask) {
          throw new Error("Task not found");
        }
        return deletedTask;
      } catch (err) {
        throw new Error(err);
      }
    },
    updateTask: async (root, { id, task }) => {
      try {
        const options = { new: true };
        const updatedTask = await Tasks.findByIdAndUpdate(id, task, options);
        if (!updatedTask) {
          throw new Error("Task not found");
        }
        return updatedTask;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
};
