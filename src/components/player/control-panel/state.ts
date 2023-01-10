import create from "zustand";

interface AudioPanelState {
    isActive: boolean;
    showControls: boolean;
    speed: number; // 1-200 (percent)
    timer: {
        value: null | number;
        remaining: null | number;
    };
    onEnd: "stop" | "next" | "repeatChapter" | "repeatBook";
    toggleActive: () => void;
    toggleControl: () => void;
    setSpeed: (value: number) => void;
    startTimer: (value: null | number) => void;
}

export const useAudioPanelState = create<AudioPanelState>()(
    set => ({
        isActive: false,
        showControls: true,
        speed: 100,
        timer: {
            value: null,
            remaining: null,
        },
        onEnd: "next",
        toggleActive: () => set(state => ({ isActive: !state.isActive })),
        toggleControl: () => set(state => ({ showControls: !state.showControls })),
        setSpeed: (value) => set(state => ({ speed: value })),
        startTimer: (value) => set(state => ({
            timer: { value: value, remaining: value },
        })),
    } as AudioPanelState),
);
