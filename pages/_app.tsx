import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Head from "next/head";

function MyApp({Component, pageProps}: AppProps) {

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
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
};
export default MyApp;
