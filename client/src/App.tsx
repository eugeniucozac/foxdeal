import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Container, Stack, Typography } from "@mui/material";
import Form from "./components/Form/Form"
import TaskList from "./components/List/List"
import Header from "./components/Header/Header";
import { useGetTasks } from "./gql/useGetTasks";
import { useAddTask } from "./gql/useAddTask";

const App = () => {
  const { addTask } = useAddTask();
  const { tasks } = useGetTasks();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasTask = tasks?.getTasks.find(task => task.name === value);
    
    if(value){
      if(hasTask){
        setError("This task is exist already");
      }else{
        await addTask({ name: value });
        setValue("");
      }
    }else{
      setError("This field is required");
      return
    }
  };

  return (
    <>
      <Header />
      <Box 
          sx={{
            [theme.breakpoints.up("xs")]: {
              paddingLeft: "0",
              paddingRight: "0",
              paddingTop: "32px",
            },
            [theme.breakpoints.up("md")]: {
              paddingLeft: "32px",
              paddingRight: "32px",
              paddingTop: "32px",
            },
          }}
      >
        <Container maxWidth="sm">
          <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
          >
            Your task manager
          </Typography>
          <Stack
            direction="column"
            justifyContent="center"
            spacing={2}
            sx={{
              [theme.breakpoints.up("xs")]: {
                paddingLeft: "0",
                paddingRight: "0",
                paddingTop: "24px",
              },
              [theme.breakpoints.up("md")]: {
                paddingLeft: "32px",
                paddingRight: "32px",
                paddingTop: "32px",
                width: "100%"
              },
            }}
          >
            <Form  
              value={value}
              error={error}
              setError={setError}
              setValue={setValue}
              addTask={handleSubmit} 
            />
            <TaskList 
              tasks={tasks?.getTasks || []} 
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default App;
