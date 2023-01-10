import { useAppState } from "../app/store";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavStore } from "./store";
import { books } from "../app/books";

export const PickOneBook = () => {
    const lang = useAppState(state => state.language);
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
