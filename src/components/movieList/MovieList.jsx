import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import './MovieList.scss';

import tmdbApi from '../../api/tmdbApi';

import MovieCard from '../movieCard/MovieCard';

function MovieList({ type, category, id }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (type !== 'similar') {
                switch (category) {
                    case 'movie':
                        response = await tmdbApi.getMovieList(type, { params });
                        break;
                    case 'tv':
                        response = await tmdbApi.getTvList(type, { params });
                        break;
                    default:
                        throw new Error('Invalid category');
                }
            } else {
                response = await tmdbApi.similar(category, id);
            }

            setItems(response.results);
        };
        getList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <MovieCard item={item} categoryProp={category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default MovieList;
