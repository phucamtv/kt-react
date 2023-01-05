import { Location, Screen, ScreenSetter } from "./entities";
import { useConfig } from "./store.config";

export interface NavigationAPI {
    prev(): void;
    
    next(): void;
    
    setLocation(loc: { book: number, chapter: number }): void;
}

export function createNavigationAPI(setter: ScreenSetter): NavigationAPI {
    const config = useConfig.getState();
    const books = config.books;
    const bookNumbers = Array.from(books.keys());
    
    return {
        prev: () => setter(state => {
            if (state.chapter > 1) {
                return { chapter: state.chapter - 1 };
            }
            
            const currentIndex = bookNumbers.findIndex(el => el === state.book);
            const nextIndex = typeof bookNumbers[currentIndex - 1] !== "undefined" ? currentIndex - 1 : bookNumbers.length - 1;
            const nextBookNumber = bookNumbers[nextIndex];
            const nextBook = books.get(nextBookNumber)!;
            
            return { book: nextBookNumber, chapter: nextBook.chapters };
        }),
        next: () => setter((state: Screen) => {
            if (state.chapter < books.get(state.book)!.chapters) {
                return { chapter: state.chapter + 1 };
            }
            
            const currentIndex = bookNumbers.findIndex(el => el === state.book);
            const nextIndex = typeof bookNumbers[currentIndex + 1] !== "undefined" ? currentIndex + 1 : 0;
            const nextBookNumber = bookNumbers[nextIndex];
            const nextBook = books.get(nextBookNumber)!;
            
            return { book: nextBookNumber, chapter: 1 };
        }),
        setLocation: (loc: {book: number, chapter: number}) => setter(state => ({
            book: loc.book,
            chapter: loc.chapter,
        })),
    };
}
