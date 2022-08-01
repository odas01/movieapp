import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Header.scss';

import logo from '../../assets/logo.png';

const headerNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movie',
    },
    {
        display: 'TV series',
        path: '/tv',
    },
];

function Header() {
    const { pathname } = useLocation();
    const headerRef = useRef();

    const active = headerNav.findIndex((e) => e.path === pathname);

    useEffect(() => {
        const handleScroll = (e) => {
            const isToggle =
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100;
            headerRef.current.classList.toggle('shink', isToggle);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/">tvMovies</Link>
                </div>
                <ul className="header__nav">
                    {headerNav.map((nav, index) => (
                        <li
                            key={index}
                            className={`${index === active ? 'active' : ''}`}
                        >
                            <Link to={nav.path}>{nav.display}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Header;
