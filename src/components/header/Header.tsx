import shallow from "zustand/shallow";
import { AppBar, Container, ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material";
import { useAppState } from "../app/store";
import { useNavStore } from "./store";
import { NavigationPopup } from "./NavigationPopup";
import { books } from "../app/books";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React from "react";

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
                    <NavigationLabel />
                    <NavigationPopup />
                </Container>
            </Toolbar>
        </AppBar>
    </>;
};
