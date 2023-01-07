import create from "zustand";
import { Box, Container, Grid, IconButton } from "@mui/material";
import React from "react";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { styled } from "@mui/material/styles";

interface AudioPanelState {
    isActive: boolean;
    showControls: boolean;
    speed: number; // 1-200 (percent)
    timer: {
        value: null | number;
        remaining: null | number;
    };
    onEnd: "stop" | "next" | "repeatChapter" | "repeatBook";
    toggleActive: () => void;
    toggleControl: () => void;
    setSpeed: (value: number) => void;
    startTimer: (value: null | number) => void;
}

const StyledPlayButton = styled(Box)({
    position: "absolute",
    zIndex: 1,
    top: -15,
    left: 0,
    right: 0,
    margin: "0 auto",
});

export const useAudioPanelState = create<AudioPanelState>()(
    set => ({
        isActive: false,
        showControls: true,
        speed: 100,
        timer: {
            value: null,
            remaining: null,
        },
        onEnd: "next",
        toggleActive: () => set(state => ({ isActive: !state.isActive })),
        toggleControl: () => set(state => ({ showControls: !state.showControls })),
        setSpeed: (value) => set(state => ({ speed: value })),
        startTimer: (value) => set(state => ({
            timer: { value: value, remaining: value },
        })),
    } as AudioPanelState),
);

export const AudioPanel = () => {
    const isActive = useAudioPanelState(state => state.isActive);
    
    console.log({ AudioPanel: isActive });
    
    return <>
        <Container>
            <Modal />
        </Container>
    </>;
};

const Modal = () => {
    return <>
        <Controls />
        
        <Box display="flex" justifyContent="center" style={{ minHeight: "7vh" }}>
            <Grid container>
                <Grid item xs={3} display={"flex"} justifyContent={"center"}>
                    <IconButton onClick={() => console.log}>
                        SPEED
                    </IconButton>
                </Grid>
                <Grid item xs={6} display={"flex"} justifyContent={"center"}>
                    <IconButton onClick={() => console.log}>
                        Hide controls
                    </IconButton>
                </Grid>
                <Grid item xs={3} display={"flex"} justifyContent={"center"}>
                    <IconButton onClick={() => console.log}>
                        Timer
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
        <hr />
    </>;
};

const Controls = () => {
    return <>
        <Box display="flex" justifyContent="center" style={{ minHeight: "7vh" }}>
            <Grid container>
                <Grid item xs={5} display={"flex"} justifyContent={"center"}>
                    <IconButton onClick={() => console.log}>
                        <FastRewindIcon fontSize="large" color="primary" />
                    </IconButton>
                </Grid>
                
                <Grid item xs={2} display={"flex"} justifyContent={"center"}>
                    <IconButton onClick={() => console.log}>
                        <PlayArrowIcon fontSize="large" color="primary" />
                    </IconButton>
                </Grid>
                
                <Grid item xs={5} display={"flex"} justifyContent={"center"}>
                    <IconButton onClick={() => console.log}>
                        <FastForwardIcon fontSize="large" color="primary" />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    </>;
};
