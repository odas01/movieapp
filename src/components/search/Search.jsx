import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Search.scss';

function Search({ categoryProp, keyword }) {
    const [value, setKeyWord] = useState(keyword || '');

    const navigate = useNavigate();

    const goToSearch = useCallback(() => {
        if (value.trim().length > 0) {
            navigate(`/${categoryProp}/search/${value}`);
        }
    }, [value, categoryProp, navigate]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            e.keyCode === 13 && goToSearch();
        };

        document.addEventListener('keyup', enterEvent);
        return () => document.removeEventListener('keyup', enterEvent);
    }, [value, goToSearch]);
    return (
        <input
            className="search"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setKeyWord(e.target.value)}
        ></input>
    );
}

export default Search;
