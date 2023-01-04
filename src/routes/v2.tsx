import { Navigation } from "../components/v2/Navigation";
import { Reader } from "../components/v2/Reader";
import { AudioPlayer } from "../components/v2/Player";

export default () => {
    return <>
        <Navigation />
        <hr />
        <AudioPlayer />
        <hr />
        <Reader />
    </>;
};
