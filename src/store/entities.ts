import { NavigationAPI } from "./api.navigate";
import { AudioContext, PlayerAPI } from "./api.audio";
import { Resource } from "./api.fetch";

export enum Translation { KJV = "KJV", NKJV = "NKJV", VI1934 = "VI1934"}

export enum Language {EN = "EN", VI = "VI"}

export interface BookInfo {
    code: string;
    chapters: number;
    name: Map<Language, string>;
}

export interface Location {
    translation: Translation;
    language: Language;
    book: number;
    chapter: number;
    verse: number;
}

export interface Screen extends Location {
    version: number;
    picking: null | Location;
    audio: AudioContext;
    navigation: NavigationAPI;
    audioPlayer: PlayerAPI;
    fetch: (loc: Location) => Promise<void>;
    resource: null | Resource;
}

export type ScreenSetter = (
    partial: Screen | Partial<Screen> | ((state: Screen) => Screen | Partial<Screen>),
    replace?: (boolean | undefined),
) => void;

export function selectLocation(state: Screen): Location {
    return {
        language: state.language,
        translation: state.translation,
        book: state.book,
        chapter: state.chapter,
    } as Location;
}
