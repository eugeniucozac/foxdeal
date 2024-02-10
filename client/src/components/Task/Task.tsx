import { useState, SyntheticEvent, ChangeEvent } from "react";
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Stack, TextField } from "@mui/material";
import { useRemoveTask } from "../../gql/useRemoveTask";
import { useUpdateTask } from "../../gql/useUpdateTask";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { TaskType } from "./types";

const Task = ({ id, name }: TaskType) => {
    const { removeTask } = useRemoveTask();
    const { updateTask, error } =  useUpdateTask();
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(name);

    const handleUpdateTask = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{
            await updateTask(id, { name: value });
            setIsEditing(false);
        }catch{
            console.log("Failed to fetch data")
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue(value);
    }

    const handleRemoveTask = async () => {
        await removeTask(id);
    }

    return (
        <ListItem dense>
            {!isEditing 
                ?
                <>
                    <ListItemText 
                        id={id} 
                        primary={<span style={{ fontSize: "16px" }}>{name}</span>} 
                    />
                    <ListItemIcon>
                        <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => setIsEditing(true)}
                        >
                            <EditIcon />
                        </IconButton>
                    </ListItemIcon>
                </>
                :
                <form style={{ width: "100%" }} onSubmit={handleUpdateTask}>
                    <Stack
                        spacing={1}
                        direction="row"
                        justifyContent="center"
                        sx={{ width: "100%" }}
                    >
                        <TextField
                            label="Edit task"
                            variant="outlined"
                            size="small"
                            value={value}
                            fullWidth
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                            onChange={handleChange}
                        />
                        <ListItemIcon>
                            <IconButton sx={{ height: 40 }} type="submit" color="success" edge="end" aria-label="update">
                                <CheckIcon />
                            </IconButton>
                        </ListItemIcon>
                    </Stack>
                </form>
            }
            <ListItemSecondaryAction>
                <IconButton color="error" edge="end" aria-label="delete" onClick={handleRemoveTask}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Task;