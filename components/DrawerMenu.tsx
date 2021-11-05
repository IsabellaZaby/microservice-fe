import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import InputIcon from '@mui/icons-material/Input';
import TimelineIcon from '@mui/icons-material/Timeline';
import React, { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface DrawerMenu {
    open: boolean;
}

const DrawerMenu: FC<DrawerMenu> = ({open}) => {

    const {pathname} = useRouter();

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                '& .MuiDrawer-paper': {
                    top: '64px',
                    minWidth: '200px'
                }
            }}
        >
            <List>
                <Link href="/">
                    <ListItem selected={pathname === '/'}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItem>
                </Link>
                <Link href="/charts">
                    <ListItem selected={pathname === '/charts'}>
                        <ListItemIcon>
                            <TimelineIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Charts"/>
                    </ListItem>
                </Link>
                <Link href="/input">
                    <ListItem selected={pathname === '/input'}>
                        <ListItemIcon>
                            <InputIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Input"/>
                    </ListItem>
                </Link>
                <Link href="/delete">
                    <ListItem selected={pathname === '/delete'}>
                        <ListItemIcon>
                            <DeleteIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Update / Delete"/>
                    </ListItem>
                </Link>
            </List>
            <Divider/>
        </Drawer>
    );
};

export default DrawerMenu;