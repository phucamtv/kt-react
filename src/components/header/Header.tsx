import shallow from "zustand/shallow";
import { useAppState } from "../app/store";
import { useNavStore } from "./store";
import { NavigationPopup } from "./NavigationPopup";
import { books } from "../app/books";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Toolbar from "@mui/material/Toolbar";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";

const NavigationLabel = () => {
    const location = useAppState(
        state => ({
            language: state.language,
            translation: state.translation,
            book: state.book,
            chapter: state.chapter,
        }),
        shallow,
    );
    
    const book = books.get(location.book)!;
    const bookName = book.name.get(location.language);
    const toggleActive = useNavStore(state => state.toggleActive);
    
    return <>
        <ToggleButtonGroup size={"medium"}>
            <ToggleButton value={"book"} onClick={toggleActive}>
                {bookName} {location.chapter} <ArrowDropDownIcon />
            </ToggleButton>
            <ToggleButton value={"chapter"}>
                {location.translation}
            </ToggleButton>
        </ToggleButtonGroup>
    </>;
};

export const Header = () => {
    return <>
        <AppBar position="static" color={"transparent"}>
            <Toolbar>
                <Container>
                    <Grid container justifyContent={"space-between"} columnSpacing={24} spacing={0}>
                        <Grid item xs={9}>
                            <NavigationLabel />
                            <NavigationPopup />
                        </Grid>
                        
                        <Grid item xs={2}>
                            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    </>;
};
