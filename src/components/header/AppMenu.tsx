import IconButton from "@mui/material/IconButton";
import { AudioPanel } from "../player/control-panel/AudioPanel";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogTitle, ListItemIcon, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import { LoopMode } from "../app/api.audio";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import { PlayerOptions } from "../player/control-panel/PlayerOptions";

export const AppMenu = () => {
    // const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    
    const onClick = (value: LoopMode) => {
        return () => {
            handleClose();
        };
    };
    
    return <>
        {/*<IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(!open)}>*/}
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
            <SettingsIcon />
        </IconButton>
        
        <Menu
            id="loopMenu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
                elevation: 0,
                sx: {
                    minWidth: 240,
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
                    "&:before": {
                        content: "\"\"",
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                    },
                },
            }}
        >
            <PlayerOptions />
        </Menu>
    </>;
};
