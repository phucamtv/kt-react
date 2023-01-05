import { Navigation } from "../components/v2/navigation/Navigation";
import { Reader } from "../components/v2/Reader";
import { AudioPlayer } from "../components/v2/Player";

export default () => {
    return <>
        <Navigation />
        <AudioPlayer />
        <Reader />
    </>;
};
