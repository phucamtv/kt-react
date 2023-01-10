import { Reader } from "./reader/Reader";
import { Navigation } from "./navigation/Navigation";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AudioStore } from "./player/AudioStore";
import { Header } from "./header/Header";

// https://m2.material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=4E342E&secondary.color=D7CCC8
const theme = createTheme({
    palette: {
        primary: {
            main: "#114954",
            light: "#437580",
            dark: "#00212b",
        },
        secondary: {
            main: "#437580",
            light: "#72a4af",
            dark: "#124954",
        },
    },
});

export default () => {
    return <>
        <ThemeProvider theme={theme}>
            <Header />
            <Reader />
            <Navigation />
            <AudioStore />
        </ThemeProvider>
    </>;
};
