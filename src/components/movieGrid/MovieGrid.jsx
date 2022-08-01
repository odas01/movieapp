import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import './MovieGrid.scss';

import tmdbApi, { movieType, tvType, category } from '../../api/tmdbApi';

import { OutLineButton } from '../button/Button';
import Search from '../search/Search';
import MovieCard from '../movieCard/MovieCard';

function MovieGrid({ categoryProp }) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [currentPage, setCurrentPage] = useState('');

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = { page };
                if (categoryProp && categoryProp !== currentPage) {
                    setPage(1);
                }

                switch (categoryProp) {
                    case category.movie:
                        response = await tmdbApi.getMovieList(
                            movieType.upcoming,
                            { params }
                        );
                        setCurrentPage('movie');
                        break;
                    case category.tv:
                        response = await tmdbApi.getTvList(tvType.popular, {
                            params,
                        });
                        setCurrentPage('tv');

                        break;
                    default:
                        new Error('Invalid category');
                }

                if (isLoadMore) {
                    setItems((prev) => [...prev, ...response.results]);
                } else {
                    setItems(response.results);
                }
                setTotalPage(response.total_pages);
                isLoadMore && setIsLoadMore(false);
            } else {
                //search
                const params = { page, query: keyword };
                response = await tmdbApi.search(categoryProp, { params });

                if (isLoadMore) {
                    setItems((prev) => [...prev, ...response.results]);
                } else {
                    setItems(response.results);
                }
                setTotalPage(response.total_pages);
            }
        };
        getList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryProp, keyword, page]);
    const loadmore = () => {
        setPage(page + 1);
        setIsLoadMore(true);
    };
    return (
        <>
            <div className="section" style={{ marginBottom: '20px' }}>
                <Search categoryProp={categoryProp} keyword={keyword} />
            </div>

            <div className="movie-grid">
                {items.map((item, index) => (
                    <MovieCard
                        categoryProp={categoryProp}
                        item={item}
                        key={index}
                    />
                ))}
            </div>
            {page < totalPage && (
                <div className="movie-grid__loadmore">
                    <OutLineButton className="small" onClick={loadmore}>
                        Load more
                    </OutLineButton>
                </div>
            )}
        </>
    );
}

export default MovieGrid;
