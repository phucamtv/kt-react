import { Picker } from "./picker/Picker";
import { Reader } from "./Reader";
import { Navigation } from "./navigation/Navigation";
import React, { StrictMode, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactPlayer from "react-player";
import { AudioStore } from "./player/AudioStore";
import { DebugController } from "./debug";

// https://m2.material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=4E342E&secondary.color=D7CCC8
const theme = createTheme({
    palette: {
        primary: {
            main: '#3e2723',
            light: "#6a4f4b",
            dark: "#1b0000"
        },
        secondary: {
            main: '#d7ccc8',
            light: "#fffffb",
            dark: "#a69b97"
        },
    },
});

export default () => {
    return <>
        <ThemeProvider theme={theme}>
            <Picker />
            <Reader />
            <Navigation />
            <AudioStore />
        </ThemeProvider>
    </>;
};
