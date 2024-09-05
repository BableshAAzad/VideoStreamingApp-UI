import React, { Suspense } from "react";
import Spinner from "../spinner/Spinner"
import HomePage from "../headerpages/HomePage";
const VideoStream = React.lazy(() => import("../headerpages/videos/VideoStream"));
const VideoUpload = React.lazy(() => import("../headerpages/VideoUpload"));
const VideoPlayerPage = React.lazy(() => import("../headerpages/videos/VideoPlayerPage"));
const ErrorPage = React.lazy(() => import("../errorpage/ErrorPage"));


export const RouteComps = [
    {
        element: (
            <Suspense fallback={<Spinner />}>
                <HomePage />
            </Suspense>
        ),
        path: "",
        isPrivate: false,
        isVisibleAfterLogin: true,
        role: []
    },
    {
        element: (
            <Suspense fallback={<Spinner />}>
                <VideoUpload />
            </Suspense>
        ),
        path: "video-upload",
        isPrivate: false,
        isVisibleAfterLogin: true,
        role: []
    },
    {
        element: (
            <Suspense fallback={<Spinner />}>
                <VideoStream />
            </Suspense>
        ),
        path: "video-stream/:videoId",
        isPrivate: false,
        isVisibleAfterLogin: true,
        role: []
    },
    {
        element: (
            <Suspense fallback={<Spinner />}>
                <VideoPlayerPage />
            </Suspense>
        ),
        path: "video-player-page/:videoId",
        isPrivate: false,
        isVisibleAfterLogin: true,
        role: []
    },






    {
        element: (
            <Suspense fallback={<Spinner />}>
                <ErrorPage />
            </Suspense>
        ),
        path: "*",
        isPrivate: false,
        isVisibleAfterLogin: true,
        role: []
    },

]