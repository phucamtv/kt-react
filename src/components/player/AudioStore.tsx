import ReactPlayer from "react-player";
import shallow from "zustand/shallow";
import { useEffect, useState } from "react";
import { useAppState } from "../app/store";
import { AppState, selectAudioURL } from "../app/entities";

type PlayingState = {
    url: string,
    isPlaying: boolean,
    speed: number,
}

const selectPlayingState = (state: AppState): PlayingState => ({
    url: selectAudioURL(state),
    isPlaying: state.audio.playing,
    speed: state.audio.speed,
} as PlayingState);

export const AudioStore = () => {
    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [url, setUrl] = useState("");
    
    useEffect(
        () => {
            useAppState.subscribe(
                selectPlayingState,
                (state, prev) => {
                    if (state.isPlaying) {
                        setUrl(state.url || "");
                    }
                    
                    if (state.isPlaying != prev.isPlaying) {
                        setPlaying(state.isPlaying);
                    }
                    
                    if (state.speed != prev.speed) {
                        setSpeed(state.speed);
                    }
                },
                { equalityFn: shallow },
            );
        },
        [],
    );
    
    console.log({ PlayerStore: { playing, url, speed } });
    
    return <>
        <div style={{ display: "none" }}>
            <pre>{JSON.stringify({ playing, url })}</pre>
            
            <ReactPlayer
                playing={playing}
                url={url}
                onError={err => console.log({ onError: err })}
                playbackRate={speed}
                loop={true}
            />
        </div>
    </>;
};
