import mongoose from 'mongoose';
import { environment } from "../config/config";
import { taskSchema } from "./schema";
const env = "development";

mongoose.connect(environment[env].dbString);

let db = mongoose.connection;
db.on("error", () => {
  console.error("Error while connecting to DB");
});

const Tasks = mongoose.model("Tasks", taskSchema);

export { Tasks };
