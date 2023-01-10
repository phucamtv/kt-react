import { Box, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import LoopIcon from "@mui/icons-material/Loop";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import { useAppState } from "../../app/store";

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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    
    const setter = useAppState(state => state.audioPlayer.setSpeed);
    const value = useAppState(state => state.audio.speed);
    const onClick = (value: number) => {
        return () => {
            handleClose();
            setter(value);
        }
    };
    
    return <Grid item xs={3} display={"flex"} justifyContent={"center"}>
        <IconButton
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <SlowMotionVideoIcon /> {value}x
        </IconButton>
        
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={onClick(0.75)}>0.75x</MenuItem>
            <MenuItem onClick={onClick(1)}>1x</MenuItem>
            <MenuItem onClick={onClick(1.25)}>1.25x</MenuItem>
            <MenuItem onClick={onClick(1.5)}>1.5x</MenuItem>
            <MenuItem onClick={onClick(2)}>2x</MenuItem>
        </Menu>
    </Grid>;
};

const TimerOption = () => {
    return <Grid item xs={3} display={"flex"} justifyContent={"center"}>
        <IconButton onClick={() => console.log}>
            <AccessTimeIcon /> Timer
        </IconButton>
    </Grid>;
};