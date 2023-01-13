import { Location, ScreenSetter } from "./entities";

export interface Resource {
    Audio: Array<string>,
    BookName: string,
    BookNumber: number,
    Content: string,
    Translation: string,
    group: string
}

const baseUrl = "https://kt-static.phucam.tv";

export const fetchAPI = (set: ScreenSetter) => async (loc: Location) => {
    const url = baseUrl + `/${loc.translation}/${loc.book.toString().padStart(2, "0")}/${loc.chapter.toString().padStart(2, "0")}.json`;
    const resource = await fetch(url).then(response => response.json()) as Resource;
    
    console.log({ url, resource });
    
    set({ resource });
};
