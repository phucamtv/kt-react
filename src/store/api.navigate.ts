import { Screen, ScreenSetter } from "./entities";
import { useConfig } from "./store.config";

export interface NavigationAPI {
    prev(): void;
    
    next(): void;
    
    picking: {
        open: () => void,
        close: () => void,
        selectBook: (value: number) => void,
        selectChapter: (value: number) => void,
    };
}

export function createNavigationAPI(setter: ScreenSetter): NavigationAPI {
    const config = useConfig.getState();
    const books = config.books;
    const bookNumbers = Array.from(books.keys());
    
    const prev = () => setter(state => {
        if (state.chapter > 1) {
            return { chapter: state.chapter - 1 };
        }
        
        const currentIndex = bookNumbers.findIndex(el => el === state.book);
        const nextIndex = typeof bookNumbers[currentIndex - 1] !== "undefined" ? currentIndex - 1 : bookNumbers.length - 1;
        const nextBookNumber = bookNumbers[nextIndex];
        const nextBook = books.get(nextBookNumber)!;
        
        return { book: nextBookNumber, chapter: nextBook.chapters };
    });
    
    const next = () => setter((state: Screen) => {
        if (state.chapter < books.get(state.book)!.chapters) {
            return { chapter: state.chapter + 1 };
        }
        
        const currentIndex = bookNumbers.findIndex(el => el === state.book);
        const nextIndex = typeof bookNumbers[currentIndex + 1] !== "undefined" ? currentIndex + 1 : 0;
        const nextBookNumber = bookNumbers[nextIndex];
        const nextBook = books.get(nextBookNumber)!;
        
        return { book: nextBookNumber, chapter: 1 };
    });
    
    return {
        prev,
        next,
        picking: {
            open: () => setter(state => state),
            close: () => setter(state => state),
            selectBook: (value: number) => setter(state => state),
            selectChapter: (value: number) => setter(state => state),
        },
    };
}

