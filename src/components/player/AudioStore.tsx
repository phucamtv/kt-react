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
    const config = useAppState(state => ({
        speed: state.audio.speed,
        loop: state.audio.loop,
    }));
    
    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState(config.speed);
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
        <div>
            <ReactPlayer
                playing={playing}
                url={url}
                onError={err => setPlaying(false)}
                onEnded={() => {
                    const state = useAppState.getState();
                    
                    switch (state.audio.loop) {
                        case "NO":
                            state.audioPlayer.toggle();
                            break;
                        
                        case "CHAPTER":
                            state.audioPlayer.toggle();
                            setTimeout(state.audioPlayer.toggle, 100);
                            break;
                        case "BOOK":
                            // TODO
                            state.navigation.next();
                            break;
                    }
                }}
                playbackRate={speed}
                loop={false}
            />
        </div>
    </>;
};
