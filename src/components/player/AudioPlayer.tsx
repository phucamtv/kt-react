import { useAppState } from "../app/store";
import React, { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import { PauseButton, PlayButton } from "./PlayButton";
import { AppState } from "../app/entities";

const select = (state: AppState) => ({
    isPlaying: state.audio.playing,
    toggle: state.audioPlayer.toggle,
});

export const AudioPlayer = () => {
    const state = useAppState(select, shallow);
    const [playing, setPlaying] = useState(state.isPlaying);
    const onClick = () => {
        setPlaying(!playing);
        state.toggle();
    };
    
    useEffect(
        () => {
            const cancel = useAppState.subscribe(
                state => state.audio.playing,
                state => setPlaying(state),
                { equalityFn: shallow },
            );
            
            return () => cancel();
        },
        [],
    );
    
    return <>
        {playing ? <PauseButton toggle={onClick} /> : <PlayButton toggle={onClick} />}
    </>;
};
