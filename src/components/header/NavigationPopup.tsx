import { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import shallow from "zustand/shallow";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { PickOneBook } from "./PickOneBook";
import { PickOneChapter } from "./PickOneChapter";
import { useNavStore } from "./store";

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
