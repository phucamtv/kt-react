import { BookInfo } from "./entities";
import create from "zustand";

export type Config = {
    bookDefault: number
    chapterDefault: number
    books: Map<number, BookInfo>
};

export const useConfig = create<Config>(set => {
    return {
        books: new Map<number, BookInfo>([
            [1, { code: "GEN", chapters: 50 }],
            [66, { code: "REV", chapters: 22 }],
        ]),
    } as Config;
});
