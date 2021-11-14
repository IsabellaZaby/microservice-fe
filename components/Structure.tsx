import React, { FC, useContext, useState } from "react";
import { classNamesHelper } from "./utils";
import DashboardAppBar from "./DashboardAppBar";
import DrawerMenu from "./DrawerMenu";
import styles from "./styles/Structure.module.scss";
import { Alert } from "@mui/material";
import { Context } from "../pages/_app";

interface IStructure {
    className?: string;
}

const Structure: FC<IStructure> = (props) => {

    const {children, className} = props;
    const [open, setOpen] = useState<boolean>(false);
    const {backendErrors} = useContext(Context);


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
                    {backendErrors && backendErrors.length > 0 && <Alert severity="error">{backendErrors}</Alert>}
                    {children}
                </main>
            </div>
            <footer className={styles.footer}>© Isabella Zaby</footer>
        </>
    );
};

export default Structure;
