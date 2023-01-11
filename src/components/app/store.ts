import { AppState, Language, ScreenSetter, Translation } from "./entities";
import { createPlayerAPI } from "./api.audio";
import { createNavigationAPI } from "./api.navigate";
import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { fetchAPI } from "./api.fetch";

export const createAppState = (set: ScreenSetter): AppState => {
    const props: Partial<AppState> = {
        translation: Translation.VI1934,
        language: Language.VI,
        book: 19,
        chapter: 119,
        verse: 1,
        audio: {
            playing: false,
            speed: 1,
            volume: 100,
            percent: 0,
            loop: "CHAPTER",
        },
        picking: null,
    };
    
    return {
        ...props,
        navigation: createNavigationAPI(set),
        audioPlayer: createPlayerAPI(set),
        fetch: fetchAPI(set),
    } as AppState;
};

export const useAppState = create<AppState>()(
    subscribeWithSelector(set => createAppState(set)),
);
