import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';

function VideoList() {
    const [videos, setVideos] = useState([]);

    const { category, id } = useParams();

    useEffect(() => {
        const getVideos = async () => {
            const response = await tmdbApi.getVideos(category, id);
            setVideos(
                response.results.filter((item) => item.type === 'Trailer')
            );
        };
        getVideos();
    }, [category, id]);
    return (
        <>
            {videos.map((video, index) => (
                <Video key={index} data={video} />
            ))}
        </>
    );
}

function Video({ data }) {
    const iframeRef = useRef();
    useEffect(() => {
        const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);
    return (
        <div className="video">
            <div className="video__title">
                <h2>{data.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${data.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
        </div>
    );
}

export default VideoList;
