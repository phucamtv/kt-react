import { Picker } from "../components/v2/picker/Picker";
import { Reader } from "../components/v2/Reader";
import { AudioPlayer } from "../components/v2/Player";
import { Navigation } from "../components/v2/navigation/Navigation";

export default () => {
    return <>
        <Picker />
        <AudioPlayer />
        <Reader />
        <Navigation />
    </>;
};
