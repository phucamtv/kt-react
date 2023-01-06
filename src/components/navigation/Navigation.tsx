import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { useScreen } from "../../store/store.screen";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import React from "react";
import { AudioPlayer } from "../player/AudioPlayer";

export const Navigation = () => {
    const api = useScreen(state => state.navigation);
    
    return <AppBar position="fixed" color="secondary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
            <IconButton onClick={api.prev}>
                <SkipPreviousIcon fontSize="small" color="primary" />
            </IconButton>
            
            <Box sx={{ flexGrow: 1 }} />
            <AudioPlayer />
            
            <IconButton onClick={api.next}>
                <SkipNextIcon fontSize="small" color="primary" />
            </IconButton>
        </Toolbar>
    </AppBar>;
};
