import shallow from "zustand/shallow";
import { useAppState } from "../app/store";
import { useNavStore } from "./store";
import { NavigationPopup } from "./NavigationPopup";
import { books } from "../app/books";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Toolbar from "@mui/material/Toolbar";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import { AppMenu } from "./AppMenu";
import Typography from "@mui/material/Typography";

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
                <Container style={{ display: "flex" }}>
                    <Typography component={"div"} color="inherit" style={{ flex: 1 }}>
                        <NavigationLabel />
                        <NavigationPopup />
                    </Typography>
                    <AppMenu />
                </Container>
            </Toolbar>
        </AppBar>
    </>;
};
