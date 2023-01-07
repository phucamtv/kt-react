import { useNavStore } from "./store";
import { AppBar, Container, Dialog, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { PickOneBook } from "./PickOneBook";
import { PickOneChapter } from "./PickOneChapter";
import { useEffect } from "react";
import shallow from "zustand/shallow";

/**
 * TODO: https://www.material.io/components/sheets-bottom#behavior
 */
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
    
    return <AppBar sx={{ position: "relative" }} color={"inherit"}>
        <Toolbar>
            <Container>
                <IconButton edge="start" color="inherit" aria-label="close" onClick={state.toggleActive}>
                    <KeyboardBackspaceIcon />
                    
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {label}
                    </Typography>
                </IconButton>
            </Container>
        </Toolbar>
    </AppBar>;
};

const NavigationPopupContent = () => {
    const section = useNavStore(state => state.section);
    const content = section == "BOOK" ? <PickOneBook /> : <PickOneChapter />;
    
    return <>
        <Container>
            <Paper sx={{ maxWidth: "100%", padding: "1em" }} square>
                {content}
            </Paper>
        </Container>
    </>;
};
