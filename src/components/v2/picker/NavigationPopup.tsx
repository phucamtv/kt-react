import { useNavStore } from "./store";
import { AppBar, Dialog, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PickOneBook } from "./PickOneBook";
import { PickOneChapter } from "./PickOneChapter";
import { useEffect } from "react";
import shallow from "zustand/shallow";

export const NavigationPopup = () => {
    const active = useNavStore(state => state.isActive);
    
    useEffect(
        () => {
            const unsubscribe = useNavStore.subscribe(
                state => ({ isActive: state.isActive, book: state.book, chapter: state.chapter }),
                state => {
                    if (!state.isActive && state.book && state.chapter) {
                        console.log({ NavigationPopup: state });
                    }
                },
                { equalityFn: shallow },
            );
            
            return () => unsubscribe();
        },
        [],
    );
    
    return <>
        <Dialog fullScreen open={active}>
            <NavigationPopupHeader />
            <NavigationPopupContent />
        </Dialog>
    </>;
};

const NavigationPopupHeader = () => {
    const state = useNavStore(state => ({
        section: state.section,
        toggleActive: state.toggleActive,
    }));
    
    const label = state.section == "BOOK" ? "Chọn sách" : "Chọn chương";
    
    return <AppBar sx={{ position: "relative" }}>
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="close" onClick={state.toggleActive}>
                <CloseIcon />
            </IconButton>
            
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {label}
            </Typography>
        </Toolbar>
    </AppBar>;
};

const NavigationPopupContent = () => {
    const section = useNavStore(state => state.section);
    const content = section == "BOOK" ? <PickOneBook /> : <PickOneChapter />;
    
    return <>
        <Paper sx={{ maxWidth: "100%", padding: "1em" }} square>
            {content}
        </Paper>
    </>;
};
