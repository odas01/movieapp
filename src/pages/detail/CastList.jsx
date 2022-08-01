import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';

function CastList() {
    const [casts, setCasts] = useState([]);

    const { category, id } = useParams();

    useEffect(() => {
        const getCats = async () => {
            const response = await tmdbApi.credits(category, id);
            setCasts(response.cast.slice(0, 5));
        };
        getCats();
    }, [category, id]);
    return (
        <div className="casts">
            {casts.map((item, i) => (
                <div key={i} className="casts__item">
                    <div
                        className="casts__item-img"
                        style={{
                            backgroundImage: `url(${tmdbApi.background(
                                item.profile_path
                            )})`,
                        }}
                    ></div>
                    <p className="casts__item-name">{item.name}</p>
                </div>
            ))}
        </div>
    );
}

export default CastList;
