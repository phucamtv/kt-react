import { useScreen } from "../../../store/store.screen";
import { Button, Grid } from "@mui/material";
import { useNavStore } from "./store";
import { books } from "../../../store/books";

export const PickOneBook = () => {
    const lang = useScreen(state => state.language);
    const set = useNavStore(state => state.setBook);
    
    const items = Array
        .from(books.keys())
        .map(i => {
            const book = books.get(i)!;
            
            return <Button
                key={i}
                style={{ justifyContent: "flex-start" }}
                title={book.name.get(lang)}
                onClick={() => set(i)}
            >{book.code}</Button>;
        });
    
    return <>
        <Grid container columns={5}>
            {items}
        </Grid>
    </>;
};
