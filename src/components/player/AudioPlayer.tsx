import { useScreen } from "../../store/store.screen";
import React from "react";
import shallow from "zustand/shallow";
import { PauseButton, PlayButton } from "./PlayButton";

export const AudioPlayer = () => {
    const state = useScreen(
        state => ({
            isPlaying: state.audio.playing,
            toggle: state.audioPlayer.toggle,
        }),
        shallow,
    );
    
    return <>
        {state.isPlaying ? <PauseButton toggle={state.toggle} /> : <PlayButton toggle={state.toggle} />}
    </>;
};
