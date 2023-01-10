import { Skeleton } from "@mui/material";
import React from "react";

export function Loading() {
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
