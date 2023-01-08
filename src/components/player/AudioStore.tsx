import ReactPlayer from "react-player";
import shallow from "zustand/shallow";
import { useEffect, useState } from "react";
import { useScreen } from "../../store/store.screen";
import { selectAudioURL } from "../../store/entities";

export const AudioStore = () => {
    const [playing, setPlaying] = useState(false);
    const [url, setUrl] = useState("");
    
    useEffect(
        () => {
            useScreen.subscribe(
                state => ({
                    url: selectAudioURL(state),
                    isPlaying: state.audio.playing,
                }),
                ({ url, isPlaying }) => {
                    setPlaying(isPlaying);
                    
                    if (isPlaying) {
                        setUrl(url || "");
                    }
                },
                { equalityFn: shallow },
            );
        },
        [],
    );
    
    console.log({ PlayerStore: { playing, url } });
    
    return <>
        <div style={{ display: "none" }}>
            <pre>{JSON.stringify({ playing, url })}</pre>
            
            <ReactPlayer
                playing={playing}
                url={url}
                onError={err => console.log({ onError: err })}
            />
        </div>
    </>;
};
