import React from 'react'
import { Link } from "react-router-dom";
import "./navigation.css"
import { useState } from 'react';
import { HomeOutlined, CommentOutlined, WechatOutlined, InstagramOutlined, CodepenOutlined, CameraOutlined, CoffeeOutlined, EnvironmentOutlined, HeartOutlined, Html5Outlined } from '@ant-design/icons';

export default function Navigation(props) {
    console.log(props.check)
    return (
        <div className='Navigate'>
            <div className='Navigate__heading'>
                <img src="https://vapa.vn/wp-content/uploads/2022/12/anh-dep-lam-hinh-nen-002.jpg" alt="" className='user_img' />
                {props.check ? null : (<h3>logo</h3>)}
            </div>
            <ul className='Navigate__list'>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Dashboard</p>)}
                        <HomeOutlined className='Navigate__item-icon' />
                    </Link>
                </li>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Product</p>)}
                        <CoffeeOutlined className='Navigate__item-icon' />
                    </Link>
                </li>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Tables</p>)}
                        <EnvironmentOutlined className='Navigate__item-icon' />
                    </Link>
                </li>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Form Elements</p>)}
                        <WechatOutlined className='Navigate__item-icon' />
                    </Link>
                </li>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Icons</p>)}
                        <CommentOutlined className='Navigate__item-icon' />
                    </Link>
                </li>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Charts</p>)}
                        <Html5Outlined className='Navigate__item-icon' />
                    </Link>
                </li>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> User Pages</p>)}
                        <InstagramOutlined className='Navigate__item-icon' />
                    </Link>
                </li>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Error Pages</p>)}
                        <CodepenOutlined className='Navigate__item-icon' />
                    </Link>
                </li>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> General Pages</p>)}
                        <HeartOutlined className='Navigate__item-icon' />
                    </Link>
                </li>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Documentation</p>)}
                        <CameraOutlined className='Navigate__item-icon' />
                    </Link>
                </li>

            </ul>
        </div>

    );
}
