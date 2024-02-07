import { TaskType } from "../types";

export type TaskInput = {
    name: string;
}

export type GetTasksData = {
    getTasks: TaskType[];
}

