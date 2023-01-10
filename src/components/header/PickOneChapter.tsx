import { useAppState } from "../app/store";
import { useNavStore } from "./store";
import { books } from "../app/books";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export const PickOneChapter = () => {
    const lang = useAppState(state => state.language);
    const bookNumber = useNavStore(state => state.book!);
    const book = books.get(bookNumber)!;
    const chapters = new Array<number>(book.chapters).keys();
    const setChapter = useNavStore(state => state.setChapter);
    const reset = useNavStore(state => state.reset);
    const setLocation = useAppState(state => state.navigation.setLocation);
    
    const items = Array.from(chapters).map(i => {
        return <Button
            key={i + 1}
            style={{ justifyContent: "flex-start" }}
            title={book.name.get(lang)}
            onClick={
                () => {
                    setChapter(i + 1);
                    const state = useNavStore.getState();
                    setLocation({ book: state.book!, chapter: state.chapter! });
                    reset();
                }
            }
        >{i + 1}</Button>;
    });
    
    return <>
        <Grid container columns={10}>
            {items}
        </Grid>
    </>;
};
