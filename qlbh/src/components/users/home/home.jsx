import React from 'react';
import { useSelector } from 'react-redux';
import './home.css';

export default function Home() {
    const userName = useSelector(state => state.userReducer.userName);

    return (
        <>
            <div classNames="header-box">
                <div classNames="icon">
                    <img src="https://estudyme.com/_next/image/?url=%2Fimages%2Fapp%2Festudyme%2Ficon-support-3d.png&w=256&q=100" alt=""
                        width="129" height="129" decoding="async" data-nimg="future" loading="lazy" />
                </div>
                <div classNames="content">Welcome back
                    <span> {userName}!</span>
                </div>
            </div>
        </>
    )
}
