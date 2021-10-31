import React, { FC, useState } from "react";
import { classNamesHelper } from "./utils";
import Head from "next/head";
import DashboardAppBar from "./DashboardAppBar";
import DrawerMenu from "./DrawerMenu";
import styles from "./styles/Structure.module.scss";
import { Alert, createTheme, ThemeProvider } from "@mui/material";

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

    const theme = createTheme({
        palette: {
            primary: {
                main: '#30694b',
                light: '#ABD5AB', //#5aab61
                dark: '#0c3823',
                contrastText: '#fff'
            }
        },
        components: {
            MuiListItem: {
                styleOverrides: {
                    "root": {
                        "&.Mui-selected": {
                            "backgroundColor": "#abd5ab"
                        }
                    }
                }
            }
        }
    });

    return (
        <>
            <Head>
                <title>Sensor Dashboard</title>
                <meta name="description" content="Sensor Dashboard for accessing data"/>
                <link rel="icon" href="/favicon.ico"/>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <DashboardAppBar handleDrawerOpen={handleDrawerOpen}/>
                {open && <div className={styles.open}/>}
                <div className={styles.container} id="main" onClick={() => setOpen(false)}>
                    <DrawerMenu open={open}/>
                    <main className={mainClassName}>
                        {error && <Alert severity="error">{error}</Alert>}
                        {children}
                    </main>
                </div>
            </ThemeProvider>
        </>
    );
};

export default Structure;