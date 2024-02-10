import { List } from "@mui/material";
import Task from "../Task/Task";
import { ListType } from "./types";
import { TaskType } from "../../types";

const TaskList = ({ tasks }: ListType) => {
    return (
        <List>
            {tasks.map((task: TaskType, idx: number) => {
                return ( 
                    <Task 
                        key={idx} 
                        {...task} 
                    />
                )
            })}
        </List>
    );
};

export default TaskList;