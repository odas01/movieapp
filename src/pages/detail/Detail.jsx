import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './Detail.scss';

import tmdbApi from '../../api/tmdbApi';

import CastList from './CastList';
import VideoList from './VideoList';
import MovieList from '../../components/movieList/MovieList';

function Detail() {
    const [item, setItem] = useState();

    const { category, id } = useParams();

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
        };
        getDetail();
    }, [category, id]);
    return (
        <>
            {item && (
                <>
                    <div
                        className="banner"
                        style={{
                            backgroundImage: `url(${tmdbApi.background(
                                item.poster_path,
                                item.backdrop_path
                            )})`,
                        }}
                    ></div>
                    <div
                        className="movie-content container"
                        style={{ marginBottom: '20px' }}
                    >
                        <div className="movie-content__poster">
                            <div
                                className="movie-content__poster-img"
                                style={{
                                    backgroundImage: `url(${tmdbApi.background(
                                        item.poster_path,
                                        item.backdrop_path
                                    )})`,
                                }}
                            ></div>
                        </div>
                        <div className="movie-content__info">
                            <div className="title">
                                {item.title || item.name}
                            </div>
                            <div className="genres">
                                {item.genres &&
                                    item.genres
                                        .slice(0, 5)
                                        .map((genre, index) => (
                                            <span
                                                key={index}
                                                className="genres__item"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                            </div>
                            <p className="overview">{item.overview}</p>
                            <div className="cast">
                                <div className="section__header">
                                    <h2>Casts</h2>
                                    <CastList />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div
                            className="section "
                            style={{ marginBottom: '20px' }}
                        >
                            <VideoList />
                        </div>
                        <div
                            className="section "
                            style={{ marginBottom: '20px' }}
                        >
                            <div
                                className="section__header "
                                style={{ marginBottom: '20px' }}
                            >
                                <h2>Similar</h2>
                            </div>
                            <MovieList
                                type="similar"
                                category={category}
                                id={item.id}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Detail;
