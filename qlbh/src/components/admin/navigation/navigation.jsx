import React from 'react'
import { Link } from "react-router-dom";
import "./navigation.css"
import { useState } from 'react';
import { HomeOutlined, CommentOutlined, WechatOutlined, InstagramOutlined, CodepenOutlined, CameraOutlined, CoffeeOutlined, EnvironmentOutlined, HeartOutlined, Html5Outlined } from '@ant-design/icons';

export default function Navigation(props) {
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
                {/* <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Vocabulary</p>)}
                        <CoffeeOutlined className='Navigate__item-icon' />
                    </Link>
                </li> */}
                {/* <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Grammar</p>)}
                        <EnvironmentOutlined className='Navigate__item-icon' />
                    </Link>
                </li> */}
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/practice">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Practice</p>)}
                        <WechatOutlined className='Navigate__item-icon' />
                    </Link>
                </li>
                {/* <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/chat">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Blog</p>)}
                        <CommentOutlined className='Navigate__item-icon' />
                    </Link>
                </li>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Accounts</p>)}
                        <Html5Outlined className='Navigate__item-icon' />
                    </Link>
                </li>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/product">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> TOEIC</p>)}
                        <InstagramOutlined className='Navigate__item-icon' />
                    </Link>
                </li> */}
                {/* <li className='Navigate__item '>
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
                </li> */}
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/category">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Category</p>)}
                        <CameraOutlined className='Navigate__item-icon' />
                    </Link>
                </li>
                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/vocabulary">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Vocabulary</p>)}
                        <CameraOutlined className='Navigate__item-icon' />
                    </Link>
                </li>

                <li className='Navigate__item '>
                    <Link className="navbar__center-link " to="/question">
                        {props.check ? null : (<p className={props.check ? "" : 'fade-in'}> Question</p>)}
                        <CameraOutlined className='Navigate__item-icon' />
                    </Link>
                </li>

            </ul>
        </div>

    );
}
