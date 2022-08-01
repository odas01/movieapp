import { useParams } from 'react-router-dom';

import { category as cate } from '../api/tmdbApi';

import PageHeader from '../components/pageHeader/PageHeader';
import MovieGrid from '../components/movieGrid/MovieGrid';

function CataLog() {
    const { category } = useParams();
    return (
        <>
            <PageHeader>
                {category === cate.movie ? 'Movies ' : 'TV Series'}
            </PageHeader>
            <div className="container">
                <div className="section" style={{ marginBottom: '20px' }}>
                    <MovieGrid categoryProp={category} />
                </div>
            </div>
        </>
    );
}

export default CataLog;
