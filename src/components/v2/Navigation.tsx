import shallow from "zustand/shallow";
import { useEffect } from "react";
import { useScreen } from "../../store/store.screen";

const Location = () => {
    const location = useScreen(
        state => ({
            translation: state.translation,
            book: state.book,
            chapter: state.chapter,
        }),
        shallow,
    );
    
    return <>
        <pre>Translation: {location.translation}</pre>
        <pre>Book: {location.book}</pre>
        <pre>Chapter: {location.chapter}</pre>
    </>;
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
        <Location />
        <Controller />
    </>
}
