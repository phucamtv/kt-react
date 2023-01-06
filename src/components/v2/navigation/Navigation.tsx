import shallow from "zustand/shallow";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import { useScreen } from "../../../store/store.screen";
import { useNavStore } from "./store";
import { NavigationPopup } from "./NavigationPopup";
import { books } from "../../../store/books";

const NavigationLabel = () => {
    const location = useScreen(
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
    
    return <IconButton onClick={toggleActive} color="inherit">
        <BookIcon /> {bookName} {location.chapter}
    </IconButton>;
};

const Controller = () => {
    const api = useScreen(state => state.navigation);
    
    return <>
        <button onClick={() => api.prev()}>PREV</button>
        <button onClick={() => api.next()}>NEXT</button>
    </>;
};

export const Navigation = () => {
    return <>
        <AppBar position="static">
            <Toolbar>
                <Typography component="div" sx={{ flexGrow: 1 }}>
                    <NavigationLabel />
                    <NavigationPopup />
                </Typography>
            </Toolbar>
        </AppBar>
        
        <Controller />
    </>;
};
