import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import { Modal } from 'antd';

import './HeroSlide.scss';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import { Button, OutLineButton } from '../button/Button';

function HeroSlide() {
    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, {
                    params,
                });
                setMovieItems(response.results.slice(0, 4));
            } catch {
                console.log('error');
            }
        };
        getMovies();
    }, []);
    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{ delay: 3000 }}
            >
                {movieItems.map((movieItem, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <HeroSlideItem
                                item={movieItem}
                                className={isActive ? 'active' : ''}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

function HeroSlideItem({ item, className }) {
    const [isVisible, setIsVisible] = useState(false);
    const [trailerSrc, setTrailerSrc] = useState('');

    let navigate = useNavigate();

    const background = apiConfig.originalImage(
        item.backdrop_path || item.poster_path
    );

    const showModal = async () => {
        try {
            const videos = await tmdbApi.getVideos(category.movie, item.id);

            if (videos.results.length > 0) {
                const videoSrc =
                    'https://www.youtube.com/embed/' + videos.results[0].key;

                setTrailerSrc(videoSrc);
            }
            setIsVisible(true);
        } catch {
            console.log('error');
        }
    };

    const hideModal = () => {
        setTrailerSrc('');
        setIsVisible(false);
    };

    return (
        <div
            className={`hero-slide__item ${className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content-info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate(`/movie/${item.id}`)}>
                            Watch now
                        </Button>
                        <OutLineButton onClick={showModal}>
                            Watch trailer
                        </OutLineButton>

                        {/* {trailerSrc && ( */}
                        <Modal
                            visible={isVisible}
                            onCancel={hideModal}
                            width="700px"
                            footer={null}
                            destroyOnClose={true}
                        >
                            {trailerSrc ? (
                                <iframe
                                    title="trailer"
                                    width="100%"
                                    height="400px"
                                    src={trailerSrc + '?autoplay=1'}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <h2
                                    style={{
                                        color: '#fff',
                                        textAlign: 'center',
                                    }}
                                >
                                    No Trailer
                                </h2>
                            )}
                        </Modal>
                        {/* )} */}
                    </div>
                </div>
                <div className="hero-slide__item__content-poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    );
}

export default HeroSlide;
