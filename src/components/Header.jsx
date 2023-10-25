/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import logo from '../assets/img/logo.png';
import useScrollPosition from '../hooks/useScroll';
import { Hamburger, Phone } from './Icon';
const Header = () => {
    const scrollPosition = useScrollPosition();
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className={`overlay ${open ? 'active' : ''}`} onClick={() => setOpen(!open)}></div>
            <header className={`${scrollPosition > 200 ? 'active' : ''}`}>
                <div className="container">
                    <div className="header-wrapper">
                        <a className="logo" href="#">
                            <img src={logo} alt="" />
                        </a>
                        <div className={`menu-wrapper ${open ? 'active' : ''}`}>
                            <ul className="menu">
                                {menu?.map((item, i) => (
                                    <li key={i}>
                                        <a
                                            href={item?.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={i == 0 ? 'active' : ''}
                                        >
                                            {item?.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="d-lg-none">
                                <HeaderRight />
                            </div>
                        </div>
                        <div className="d-none d-lg-block">
                            <HeaderRight />
                        </div>
                        <div className="d-lg-none hamburger" onClick={() => setOpen(!open)}>
                            <Hamburger />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

const HeaderRight = () => {
    return (
        <>
            <div className="header-right">
                {/* <a href="#" className="login-btn">
                    Login
                </a> */}
                <a href="tel:+08118555211" className="tel-btn">
                    <Phone />
                    <div>
                        <div>24/7 Support</div>
                        <div className="number">08118555211</div>
                    </div>
                </a>
            </div>
        </>
    );
};

const menu = [
    {
        title: 'Offerte per Ischia',
        url: '#',
    },
    {
        title: "Scopri l'isola",
        url: 'https://www.infoischia.com/',
    },
    {
        title: '10 luoghi da vedere',
        url: 'https://www.infoischia.com/visitare-ischia-i-10-luoghi-da-non-perdere/',
    },
];
export default Header;
