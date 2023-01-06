import { ScreenSetter } from "./entities";

export type AudioContext = {
    playing: boolean,
    speed: number,
    loop: "NO" | "CHAPTER" | "BOOK",
    percent: number,
    volume: number
};

export interface PlayerAPI {
    toggle(): void;
}

export const createPlayerAPI = (setter: ScreenSetter): PlayerAPI => {
    return {
        toggle: () => setter(state => ({
            audio: { ...state.audio, playing: !state.audio.playing },
        })),
    };
};
