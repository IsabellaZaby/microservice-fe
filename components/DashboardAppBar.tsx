import { FC } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocationDateTime from "./LocationDateTime";

interface IDashboardAppBar {
    handleDrawerOpen: () => void;
}

const DashboardAppBar: FC<IDashboardAppBar> = ({handleDrawerOpen}) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Dashboard
                </Typography>
                <LocationDateTime/>
            </Toolbar>
        </AppBar>
    );
};

export default DashboardAppBar;
