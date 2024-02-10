import { ChangeEvent } from "react";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FormType } from "./types";

const Form = ({ onSubmit, setValue, value, error }: FormType) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue(value);
    }

    return (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <form onSubmit={onSubmit} role="form">
            <Stack
                spacing={1}
                direction="row"
                justifyContent="center"
                sx={{ width: "100%" }}
            >
                <FormControl fullWidth>
                    <TextField
                        label="Add task*"
                        variant="outlined"
                        value={value}
                        fullWidth
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                        onChange={handleChange}
                    />
                </FormControl>
                <Button 
                    sx={{ px: 4, height: 55 }} 
                    type="submit" 
                    size="large" 
                    variant="contained" 
                    endIcon={<AddIcon />}
                >
                    Add
                </Button>
            </Stack>
        </form>
    );
};

export default Form;