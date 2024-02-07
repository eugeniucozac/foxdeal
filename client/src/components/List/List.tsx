import { List } from "@mui/material";
import Item from "../Item/Item";
import { ListType } from "./types";
import { TaskType } from "../../types";

const TaskList = ({ tasks }: ListType) => {
    return (
        <List>
            {tasks.map((task: TaskType, idx: number) => {
                return ( 
                    <Item 
                        key={idx} 
                        {...task} 
                        tasks={tasks}
                    />
                )
            })}
        </List>
    );
};

export default TaskList;