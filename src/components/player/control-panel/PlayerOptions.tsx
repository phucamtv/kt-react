import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useAppState } from "../../app/store";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { LoopMode } from "../../app/api.audio";

const config = {
    options: {
        buttonToggle: false,
        loop: true,
        timer: false,
    },
};

export const PlayerOptions = () => {
    return <>
        <Box display="flex" justifyContent="center" style={{ minHeight: "7vh" }}>
            <Grid container columns={12}>
                {config.options.buttonToggle && <ButtonToggleOption />}
                <Grid item columns={3}>
                    <SpeedOption />
                </Grid>
                
                <Grid item columns={3}>
                    {config.options.loop && <LoopOptions />}
                </Grid>
                
                <Grid item columns={3}>
                    {config.options.timer && <TimerOption />}
                </Grid>
            </Grid>
        </Box>
    </>;
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
        };
    };
    
    return <Box display={"flex"} justifyContent={"center"}>
        <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
        >
            <SlowMotionVideoIcon /> Tốc độ {value}x
        </IconButton>
        
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
            <MenuItem onClick={onClick(0.75)}>0.75x</MenuItem>
            <MenuItem onClick={onClick(1)}>1x</MenuItem>
            <MenuItem onClick={onClick(1.25)}>1.25x</MenuItem>
            <MenuItem onClick={onClick(1.5)}>1.5x</MenuItem>
            <MenuItem onClick={onClick(2)}>2x</MenuItem>
        </Menu>
    </Box>;
};

const LoopOptions = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const setter = useAppState(state => state.audioPlayer.setLoopMode);
    const value = useAppState(state => state.audio.loop);
    
    const onClick = (value: LoopMode) => {
        return () => {
            handleClose();
            setter(value);
        };
    };
    
    const maps = new Map<LoopMode, React.ReactElement>([
        ["NO", <span><NotInterestedIcon /> Không lặp</span>],
        ["CHAPTER", <span><RepeatOneIcon /> Lặp lại chương</span>],
        ["BOOK", <span><RestartAltIcon /> Lặp lại sách</span>],
    ]);
    
    return <Box display={"flex"} justifyContent={"center"}>
        <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
        >
            { maps.get(value) }
        </IconButton>
        
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
            <MenuItem onClick={onClick("NO")}>{maps.get("NO")}</MenuItem>
            <hr />
            <MenuItem onClick={onClick("CHAPTER")}>{maps.get("CHAPTER")}</MenuItem>
            <MenuItem onClick={onClick("BOOK")}>{maps.get("BOOK")}</MenuItem>
        </Menu>
    </Box>;
};

const TimerOption = () => {
    return <Box display={"flex"} justifyContent={"center"}>
        <IconButton onClick={() => console.log}>
            <AccessTimeIcon /> Timer
        </IconButton>
    </Box>;
};
