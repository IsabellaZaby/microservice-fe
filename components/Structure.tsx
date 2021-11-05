import React, { FC, useState } from "react";
import { classNamesHelper } from "./utils";
import DashboardAppBar from "./DashboardAppBar";
import DrawerMenu from "./DrawerMenu";
import styles from "./styles/Structure.module.scss";
import { Alert } from "@mui/material";

interface IStructure {
    error?: string;
    className?: string;
}

const Structure: FC<IStructure> = (props) => {

    const {children, error, className} = props;
    const [open, setOpen] = useState<boolean>(false);


    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const mainClassName = classNamesHelper([
        styles.main,
        open && styles.open,
        className ?? ''
    ]);

    return (
        <>
            <DashboardAppBar handleDrawerOpen={handleDrawerOpen}/>
            {open && <div className={styles.open}/>}
            <div className={styles.container} id="main" onClick={() => setOpen(false)}>
                <DrawerMenu open={open}/>
                <main className={mainClassName}>
                    {error && <Alert severity="error">{error}</Alert>}
                    {children}
                </main>
            </div>
            <footer className={styles.footer}>© Isabella Zaby</footer>
        </>
    );
};

export default Structure;