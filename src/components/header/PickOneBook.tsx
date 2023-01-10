import { useAppState } from "../app/store";
import { useNavStore } from "./store";
import { books } from "../app/books";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

export const PickOneBook = () => {
    const lang = useAppState(state => state.language);
    const setBook = useNavStore(state => state.setBook);
    const bookNumber = useNavStore(state => state.book!);
    const book = books.get(bookNumber);
    const chapters = !book ? [] : Array.from(new Array<number>(book.chapters).keys());
    const setChapter = useNavStore(state => state.setChapter);
    const reset = useNavStore(state => state.reset);
    const setLocation = useAppState(state => state.navigation.setLocation);
    const [bookRange, setBookRange] = useState("ot");
    
    const chapterItems = !book ? <></> : chapters.map(i => {
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
                    
                    // TODO: scroll to top
                }
            }
        >{i + 1}</Button>;
    });
    
    const bookItems = Array
        .from(books.keys())
        .filter(i => bookRange == "ot" ? i <= 39 : i >= 40)
        .map(i => {
            const book = books.get(i)!;
            const title = book.name.get(lang);
            
            return <Container key={i} style={{ display: "flex" }}>
                <Typography color="inherit" style={{ flex: 1 }}>
                    <Button
                        style={{ justifyContent: "flex-start" }}
                        title={book.name.get(lang)}
                        onClick={() => setBook(i)}
                    >
                        {title}
                    </Button>
                </Typography>
                
                <KeyboardArrowRightIcon />
            </Container>;
        });
    
    return <>
        <Grid container>
            <Grid item md={12} xs={12}>
                <Tabs
                    value={bookRange}
                    onChange={(e, value) => setBookRange(value)}
                >
                    <Tab value={"ot"} label="Cựu Ước" />
                    <Tab value={"nt"} label="Tân Ước" />
                </Tabs>
            </Grid>
            
            <Grid item md={10} xs={10}>
                {bookItems}
            </Grid>
            
            <Grid item md={2} xs={2}>
                <Box style={{ animationName: "slidein", animationDuration: "2s" }}>
                    {chapterItems}
                </Box>
            </Grid>
        </Grid>
    </>;
};
