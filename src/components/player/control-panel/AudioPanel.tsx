import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useAudioPanelState } from "./state";
import { PlayerOptions } from "./PlayerOptions";

const config = {
    controls: {
        enabled: false,
        seek: false,
        playToggle: false,
    },
};

export const AudioPanel = () => {
    const isActive = useAudioPanelState(state => state.isActive);
    
    console.log({ AudioPanel: isActive });
    
    return <>
        <Container>
            {config.controls.enabled && <Controls />}
            
            <PlayerOptions />
        </Container>
    </>;
};

const Controls = () => {
    return <>
        <Box display="flex" justifyContent="center" style={{ minHeight: "7vh" }}>
            <Grid container>
                {
                    config.controls.seek &&
					<Grid item xs={5} display={"flex"} justifyContent={"center"}>
						<IconButton onClick={() => console.log}>
							<FastRewindIcon fontSize="large" color="primary" />
						</IconButton>
					</Grid>
                }
                
                {
                    config.controls.playToggle &&
					<Grid item xs={2} display={"flex"} justifyContent={"center"}>
						<IconButton onClick={() => console.log}>
							<PlayArrowIcon fontSize="large" color="primary" />
						</IconButton>
					</Grid>
                }
                
                {
                    config.controls.seek &&
					<Grid item xs={5} display={"flex"} justifyContent={"center"}>
						<IconButton onClick={() => console.log}>
							<FastForwardIcon fontSize="large" color="primary" />
						</IconButton>
					</Grid>
                }
            </Grid>
        </Box>
    </>;
};
