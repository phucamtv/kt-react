import { Language, Location, Screen, ScreenSetter, Translation } from "./entities";
import { useConfig } from "./store.config";
import { createPlayerAPI } from "./api.audio";
import { createNavigationAPI } from "./api.navigate";
import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { fetchAPI, Resource } from "./api.fetch";

export const createScreen = (set: ScreenSetter): Screen => {
    const props: Partial<Screen> = {
        translation: Translation.VI1934,
        language: Language.VI,
        book: 1,
        chapter: 1,
        verse: 1,
        audio: {
            playing: false,
            speed: 1,
            volume: 100,
            percent: 0,
            loop: "NO",
        },
        picking: null,
    };
    
    return {
        ...props,
        navigation: createNavigationAPI(set),
        audioPlayer: createPlayerAPI(set),
        fetch: fetchAPI(set),
    } as Screen;
};

export const useScreen = create<Screen>()(
    subscribeWithSelector(set => createScreen(set)),
);
