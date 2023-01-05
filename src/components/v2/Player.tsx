import { useScreen } from "../../store/store.screen";
import shallow from "zustand/shallow";
import { useEffect, useState } from "react";
import { Screen } from "../../store/entities";

function reducer(state: Screen): Array<string> {
    return state.resource?.Audio || [];
}

export const AudioPlayer = () => {
    const base = "https://kinhthanh.httlvn.org";
    const resources = useScreen(reducer, shallow);
    const [links, setLinks] = useState(resources);
    
    useEffect(
        () => {
            const unsubscribe = useScreen.subscribe(
                reducer,
                links => setLinks(links.map(link => base + link.replaceAll("\\", "/"))),
                { equalityFn: shallow },
            );
            
            return () => unsubscribe();
        },
        [location],
    );
    
    return <>
        <h2>AudioPlayer</h2>
        <hr />
        
        <ul>
            {links.map(link => <li key={link}>{link}</li>)}
        </ul>
    
        <hr />
    </>;
};
