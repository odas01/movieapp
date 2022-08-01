import { Link } from 'react-router-dom';

import { category, movieType, tvType } from '../api/tmdbApi';

import MovieList from '../components/movieList/MovieList';
import HeroSlide from '../components/heroSlide/HeroSlide';
import { OutLineButton } from '../components/button/Button';

function Home() {
    return (
        <>
            <HeroSlide />
            <div className="container">
                <div className="section" style={{ marginBottom: '20px' }}>
                    <div
                        className="section-header"
                        style={{ marginBottom: '20px' }}
                    >
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <OutLineButton className="small">
                                View more
                            </OutLineButton>
                        </Link>
                    </div>
                    <MovieList
                        category={category.movie}
                        type={movieType.popular}
                    />
                </div>
                <div className="section" style={{ marginBottom: '20px' }}>
                    <div
                        className="section-header"
                        style={{ marginBottom: '20px' }}
                    >
                        <h2>Top Rated Movies</h2>
                        <Link to="/movie">
                            <OutLineButton className="small">
                                View more
                            </OutLineButton>
                        </Link>
                    </div>
                    <MovieList
                        category={category.movie}
                        type={movieType.top_rated}
                    />
                </div>
                <div className="section" style={{ marginBottom: '20px' }}>
                    <div
                        className="section-header"
                        style={{ marginBottom: '20px' }}
                    >
                        <h2>Trending TV</h2>
                        <Link to="/movie">
                            <OutLineButton className="small">
                                View more
                            </OutLineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular} />
                </div>
                <div className="section" style={{ marginBottom: '20px' }}>
                    <div
                        className="section-header"
                        style={{ marginBottom: '20px' }}
                    >
                        <h2>Top Rated TV</h2>
                        <Link to="/movie">
                            <OutLineButton className="small">
                                View more
                            </OutLineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated} />
                </div>
            </div>
        </>
    );
}

export default Home;
