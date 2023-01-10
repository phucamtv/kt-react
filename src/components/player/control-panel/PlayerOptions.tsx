import { Box, Grid, IconButton } from "@mui/material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import LoopIcon from "@mui/icons-material/Loop";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";

export const PlayerOptions = () => {
    return <>
        <Box display="flex" justifyContent="center" style={{ minHeight: "7vh" }}>
            <Grid container>
                <ButtonToggleOption />
                <SpeedOption />
                <LoopOptions />
                <TimerOption />
            </Grid>
        </Box>
    </>;
};

const LoopOptions = () => {
    return <Grid item xs={3} display={"flex"} justifyContent={"center"}>
        <IconButton onClick={() => console.log}>
            <LoopIcon /> Lặp
        </IconButton>
    </Grid>;
};

const ButtonToggleOption = () => {
    return <Grid item xs={3} display={"flex"} justifyContent={"center"}>
        <IconButton onClick={() => console.log}>
            <ToggleOffIcon /> Controls
        </IconButton>
    </Grid>;
};

const SpeedOption = () => {
    return <Grid item xs={3} display={"flex"} justifyContent={"center"}>
        <IconButton onClick={() => console.log}>
            <SlowMotionVideoIcon /> 1x
        </IconButton>
    </Grid>;
};

const TimerOption = () => {
    return <Grid item xs={3} display={"flex"} justifyContent={"center"}>
        <IconButton onClick={() => console.log}>
            <AccessTimeIcon /> Timer
        </IconButton>
    </Grid>;
};
