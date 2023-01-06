import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import React from "react";
import PauseIcon from "@mui/icons-material/Pause";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";

const StyledPlayButton = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -15,
    left: 0,
    right: 0,
    margin: "0 auto",
});

export const PlayButton = (props: { toggle: () => void  }) => {
    return <StyledPlayButton>
        <PlayArrowIcon fontSize="large" color="primary" onClick={props.toggle} />
    </StyledPlayButton>
}

export const PauseButton = (props: { toggle: () => void  }) => {
    return <StyledPlayButton>
        <PauseIcon fontSize="large" color="primary" onClick={props.toggle} />
    </StyledPlayButton>
}
