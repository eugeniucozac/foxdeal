import mongoose  from "mongoose";

export const taskSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});
