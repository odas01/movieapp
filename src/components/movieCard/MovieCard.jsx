import { Link } from 'react-router-dom';
import { PlayCircleOutlined } from '@ant-design/icons';

import './MovieCard.scss';

import tmdbApi from '../../api/tmdbApi';

import { Button } from '../button/Button';

function MovieCard({ item, categoryProp }) {
    const url = `/${categoryProp}/${item.id}`;
    const bg = tmdbApi.background(item.poster_path, item.backdrop_path);
    return (
        <Link to={url}>
            <div
                className="movie-card"
                style={{ backgroundImage: `url(${bg})` }}
            >
                <Button>
                    <PlayCircleOutlined />
                </Button>
            </div>
            <h3 className="movie-title">{item.title || item.name}</h3>
        </Link>
    );
}

export default MovieCard;
