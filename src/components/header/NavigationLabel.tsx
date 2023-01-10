import { useAppState } from "../app/store";
import shallow from "zustand/shallow";
import { books } from "../app/books";
import { useNavStore } from "./store";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const NavigationLabel = () => {
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
