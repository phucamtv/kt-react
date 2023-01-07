import { useScreen } from "../store/store.screen";
import shallow from "zustand/shallow";
import React, { useEffect, useState } from "react";
import { selectLocation } from "../store/entities";
import { Container, Skeleton } from "@mui/material";

function Loading() {
    return <>
        <Skeleton width={66} />
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation="pulse" />
        <Skeleton animation={false} />
        <Skeleton width={66} />
        <Skeleton animation="wave" />
        <Skeleton animation="pulse" />
        <Skeleton animation={false} />
        <Skeleton width={66} />
        <Skeleton animation="wave" />
        <Skeleton animation="pulse" />
        <Skeleton animation={false} />
        <Skeleton width={66} />
        <Skeleton animation="wave" />
        <Skeleton animation="pulse" />
        <Skeleton animation={false} />
        <Skeleton width={66} />
        <Skeleton animation="wave" />
        <Skeleton animation="pulse" />
        <Skeleton animation={false} />
        <Skeleton width={33} />
    </>
}

function ReadingContent(props: { loading: boolean }) {
    const content = useScreen(state => state.resource?.Content, shallow);
    
    if (props.loading) {
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
    const [loading, setLoading] = useState(true);
    
    // subscribe to location changed -> fetch data
    useEffect(
        () => {
            const done = () => setLoading(false);
            const state = useScreen.getState();
            const loc = selectLocation(state);
            state.fetch(loc).then(() => done());
            
            const unsubscribe = useScreen.subscribe(
                selectLocation,
                async loc => {
                    setLoading(true);
                    await useScreen.getState().fetch(loc);
                    setLoading(false);
                },
                { equalityFn: shallow },
            );
            
            return () => unsubscribe();
        },
        [],
    );
    
    return <>
        <ReadingContent loading={loading} />
    </>;
};
