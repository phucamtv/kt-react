import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { useScreen } from "../../../store/store.screen";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import React from "react";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const StyledPlayButton = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -15,
    left: 0,
    right: 0,
    margin: "0 auto",
});

const AudioButton = () => {
    const links = useScreen(state => state.resource?.Audio);
    const isPlaying = useScreen(state => state.audio.playing);
    const toggle = useScreen(state => state.audioPlayer.toggle);
    const playButton = <PlayArrowIcon fontSize="large" color="primary" onClick={toggle} />;
    const pauseIcon = <PauseIcon fontSize="large" color="primary" onClick={toggle} />;
    const button = isPlaying ? pauseIcon : playButton;
    
    if (!links) {
        return <></>;
    }
    
    return <>
        <StyledPlayButton>
            {button}
        </StyledPlayButton>
    </>;
};

export const Navigation = () => {
    const api = useScreen(state => state.navigation);
    
    return <AppBar position="fixed" color="inherit" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
            <IconButton onClick={api.prev}>
                <SkipPreviousIcon fontSize="small" color="primary" />
            </IconButton>
            
            <Box sx={{ flexGrow: 1 }} />
            <AudioButton />
            
            <IconButton onClick={api.next}>
                <SkipNextIcon fontSize="small" color="primary" />
            </IconButton>
        </Toolbar>
    </AppBar>;
};
