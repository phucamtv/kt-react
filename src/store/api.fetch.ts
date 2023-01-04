import { Location, ScreenSetter } from "./entities";

export interface Resource {
    Audio: Array<string>,
    BookName: string,
    BookNumber: number,
    Content: string,
    Translation: string,
    group: string
}

let version = 0;

export const fetchAPI = (set: ScreenSetter) => async (loc: Location) => {
    const url = `/resources/${loc.translation}/${loc.book.toString().padStart(2, "0")}/${loc.chapter.toString().padStart(2, "0")}.json`;
    const resource = await fetch(url).then(response => response.json()) as Resource;
    
    console.log({ url, resource });
    
    set({ resource });
};
