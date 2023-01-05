import { useScreen } from "../../../store/store.screen";
import { useConfig } from "../../../store/store.config";
import { useNavStore } from "./store";
import { Button, Grid } from "@mui/material";
import { Location } from "../../../store/entities";

export const PickOneChapter = () => {
    const lang = useScreen(state => state.language);
    const books = useConfig(state => state.books);
    const bookNumber = useNavStore(state => state.book!);
    const book = books.get(bookNumber)!;
    const chapters = new Array<number>(book.chapters).keys();
    const setChapter = useNavStore(state => state.setChapter);
    const reset = useNavStore(state => state.reset);
    const setLocation = useScreen(state => state.navigation.setLocation);
    
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
