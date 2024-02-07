import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { CssBaseline } from "@mui/material";

const Header = () => {
    return (
        <AppBar position="relative">
            <CssBaseline />
            <Toolbar>
                <AddTaskIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap>
                    Task Manager
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;