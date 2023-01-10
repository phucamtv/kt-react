import { useAppState } from "../app/store";
import shallow from "zustand/shallow";
import React, { useEffect, useState } from "react";
import { selectLocation } from "../app/entities";
import { Container } from "@mui/material";
import { Loading } from "./Loading";

function ReadingContent(props: { isLoading: boolean }) {
    const content = useAppState(state => state.resource?.Content, shallow);
    
    if (props.isLoading) {
        return <>
            <Container style={{ padding: "20px", paddingBottom: "120px", overflow: "auto" }}>
                <Loading />
            </Container>
        </>;
    }
    
    return <>
        <Container style={{ padding: "20px", paddingBottom: "120px", overflow: "auto" }}>
            {!content ? <Loading /> : <div dangerouslySetInnerHTML={{ __html: content }} />}
        </Container>
    </>;
}

export const Reader = () => {
    const [isLoading, setIsLoading] = useState(true);
    
    // subscribe to location changed -> fetch data
    useEffect(
        () => {
            const done = () => setIsLoading(false);
            const state = useAppState.getState();
            const loc = selectLocation(state);
            state.fetch(loc).then(() => done());
            
            const unsubscribe = useAppState.subscribe(
                selectLocation,
                async loc => {
                    setIsLoading(true);
                    await useAppState.getState().fetch(loc);
                    setIsLoading(false);
                },
                { equalityFn: shallow },
            );
            
            return () => unsubscribe();
        },
        [],
    );
    
    return <>
        <ReadingContent isLoading={isLoading} />
    </>;
};
