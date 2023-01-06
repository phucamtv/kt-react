import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface NavStore {
    isActive: boolean;
    section: "BOOK" | "CHAPTER";
    book: null | number;
    chapter: null | number;
    toggleActive: () => void;
    setBook: (value: number) => void;
    setChapter: (value: number) => void;
    reset: () => void;
}

export const useNavStore = create<NavStore>()(
    subscribeWithSelector(
        set => ({
            isActive: false,
            section: "BOOK",
            toggleActive: () => set(state => ({ isActive: !state.isActive })),
            setBook: (selectedBook: number) => set(state => ({ book: selectedBook, section: "CHAPTER" })),
            setChapter: (selectedChapter: number) => set(state => ({ chapter: selectedChapter, isActive: false })),
            reset: () => set(state => ({ book: null, chapter: null, section: "BOOK", isActive: false })),
        } as NavStore),
    ),
);
