import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { AudioPanel } from "../player/control-panel/AudioPanel";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const AppMenu = () => {
    const [open, setOpen] = useState(false);
    
    return <>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <MenuIcon onClick={() => setOpen(!open)} />
        </IconButton>
        
        <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
            <DialogTitle>Tuỳ chỉnh</DialogTitle>
            <Box
                noValidate
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: "auto",
                    width: "fit-content",
                }}
            >
                <AudioPanel />
            </Box>
            <DialogActions>
                <Button onClick={() => setOpen(!open)}>Done</Button>
            </DialogActions>
        </Dialog>
    </>;
};
