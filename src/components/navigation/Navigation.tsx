import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useAppState } from "../app/store";
import { AudioPlayer } from "../player/AudioPlayer";

export const Navigation = () => {
    const api = useAppState(state => state.navigation);
    
    return <AppBar position="fixed" color="default" sx={{ top: "auto", bottom: 0 }}>
        <Container>
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
        </Container>
    </AppBar>;
};
