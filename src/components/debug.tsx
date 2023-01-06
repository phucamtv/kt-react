import create from "zustand";
import ReactPlayer from "react-player";

interface DebugState {
    isPlaying: boolean;
    url: string;
    toggle: () => void;
}

const useDebugState = create<DebugState>()(set => ({
    isPlaying: false,
    url: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
    toggle: () => set(state => ({ isPlaying: !state.isPlaying })),
}));

const DebugPlayer = () => {
    const { isPlaying, url } = useDebugState(state => ({ isPlaying: state.isPlaying, url: state.url }));
    
    
    console.log("DebugPlayer");
    
    return <>
        <pre>isPlaying: {isPlaying ? "Y" : "N"}</pre>
        <pre>url: {url}</pre>
        
        <ReactPlayer
            playing={isPlaying}
            url={url}
            onError={err => console.log({ onError: err })}
        />
    </>;
};

export const DebugController = () => {
    const toggle = useDebugState(state => state.toggle);
    
    return <>
        <button onClick={() => toggle()}>
            Toggle
        </button>
    </>;
};

export const Debug = () => {
    return <>
        <DebugPlayer />
        <DebugController />
    </>;
};
