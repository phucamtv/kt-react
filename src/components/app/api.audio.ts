import { ScreenSetter } from "./entities";

type LoopMode = "NO" | "CHAPTER" | "BOOK";

export type AudioContext = {
    playing: boolean,
    speed: number,
    loop: LoopMode,
    percent: number,
    volume: number
};

export interface PlayerAPI {
    toggle(): void;
    
    setLoopMode(value: LoopMode): void;
    
    setSpeed(value: number): void;
}

export const createPlayerAPI = (setter: ScreenSetter): PlayerAPI => {
    return {
        toggle: () => setter(state => ({ audio: { ...state.audio, playing: !state.audio.playing } })),
        setLoopMode: (mode: LoopMode) => setter(state => ({ audio: { ...state.audio, loop: mode } })),
        setSpeed: (value: number) => setter(state => ({ audio: { ...state.audio, speed: value } })),
    };
};
