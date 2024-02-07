import { useState, SyntheticEvent, ChangeEvent } from "react";
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Stack, TextField } from "@mui/material";
import { useRemoveTask } from "../../gql/useRemoveTask";
import { useUpdateTask } from "../../gql/useUpdateTask";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { ItemType } from "./types";

const Item = ({ id, name, tasks }: ItemType) => {
    const { removeTask } = useRemoveTask();
    const { updateTask } =  useUpdateTask();
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(name);
    const [error, setError] = useState("");

    const handleUpdateTask = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const hasTask = tasks.find(task => task.name === value && task.id !== id);

        if(value){
            if(hasTask){
                setError("This task is exist already");
            }else{
                setIsEditing(false);
                await updateTask(id, { name: value });
            }
        }else{
            setError("This field is required");
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue(value);
        if(value && setError){
            setError("");
        }
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
                            error={Boolean(error)}
                            helperText={error}
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

export default Item;