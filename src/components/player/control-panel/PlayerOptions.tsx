import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useAppState } from "../../app/store";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import { LoopMode } from "../../app/api.audio";
import { ListItemIcon, ListItemText } from "@mui/material";
import Typography from "@mui/material/Typography";

const config = {
    options: {
        buttonToggle: false,
        loop: true,
        timer: false,
    },
};

export const PlayerOptions = () => {
    return <>
        {/*{config.options.buttonToggle && <ButtonToggleOption />}*/}
        <SpeedOption />
        {config.options.loop && <LoopOptions />}
        {config.options.timer && <TimerOption />}
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
    const setter = useAppState(state => state.audioPlayer.setSpeed);
    const value = useAppState(state => state.audio.speed);
    const [open, setOpen] = useState(false);
    const onClick = (value: number) => () => {
        setter(value);
        setOpen(false);
    };
    
    return <>
        <MenuItem onClick={() => setOpen(!open)}>
            <ListItemIcon><SlowMotionVideoIcon /></ListItemIcon>
            <ListItemText>Tốc độ </ListItemText>
            <Typography variant="body2" color="text.secondary">{value}x</Typography>
        </MenuItem>
        
        {open && <>
			<MenuItem onClick={onClick(0.75)}><ListItemText inset>0.75x</ListItemText></MenuItem>
			<MenuItem onClick={onClick(1)}><ListItemText inset>1x</ListItemText></MenuItem>
			<MenuItem onClick={onClick(1.25)}><ListItemText inset>1.25x</ListItemText></MenuItem>
			<MenuItem onClick={onClick(1.5)}><ListItemText inset>1.5x</ListItemText></MenuItem>
			<MenuItem onClick={onClick(2)}><ListItemText inset>2x</ListItemText></MenuItem>
		</>}
    </>;
};

const LoopOptions = () => {
    const [open, setOpen] = useState(false);
    const setter = useAppState(state => state.audioPlayer.setLoopMode);
    const value = useAppState(state => state.audio.loop);
    const onClick = (value: LoopMode) => () => {
        setter(value);
        setOpen(false);
    };
    const labels = new Map<LoopMode, string>([
        ["NO", "Không lặp"],
        ["CHAPTER", "Lặp chương"],
        ["BOOK", "Lặp sách"],
    ]);
    
    return <>
        <MenuItem onClick={() => setOpen(!open)}>
            <ListItemIcon><RepeatOneIcon /></ListItemIcon>
            <ListItemText>Lặp lại</ListItemText>
            <Typography variant="body2" color="text.secondary">
                {labels.get(value)}
            </Typography>
        </MenuItem>
        
        {open && <>
			<MenuItem onClick={onClick("NO")}>
				<ListItemText inset>{labels.get("NO")}</ListItemText>
			</MenuItem>
			<MenuItem onClick={onClick("CHAPTER")}>
				<ListItemText inset>{labels.get("CHAPTER")}</ListItemText>
			</MenuItem>
			<MenuItem onClick={onClick("BOOK")}>
				<ListItemText inset>{labels.get("BOOK")}</ListItemText>
			</MenuItem>
		</>}
    </>;
};

const TimerOption = () => {
    return <Box display={"flex"} justifyContent={"center"}>
        <IconButton onClick={() => console.log}>
            <AccessTimeIcon /> Timer
        </IconButton>
    </Box>;
};
