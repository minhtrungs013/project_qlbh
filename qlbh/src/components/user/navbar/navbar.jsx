import { BellOutlined, MenuOutlined, PoweroffOutlined, SearchOutlined } from '@ant-design/icons';
import { faBars, faBlog, faBook, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setRoleUser, setLoggedIn } from '../../redux/_actions/user.actions';
import "./navbar.css";


export default function Navbar(props) {
    const navigate = useNavigate();
    const userName = useSelector(state => state.userReducer.userName);
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(setUser(null))
        dispatch(setRoleUser(null))
        dispatch(setLoggedIn(false))
        navigate("/login");
    }

    return (
        <div className='navbar_user'>
            <div className='navbar__item'>
                <div className='navbar__left'>
                    <div className='Navigate__heading1'>
                        <img src="https://vapa.vn/wp-content/uploads/2022/12/anh-dep-lam-hinh-nen-002.jpg" alt="" className='user_img1' />
                    </div>
                    <input type="text" className='user__search_item' placeholder='Search...' />
                    <div className='user__search_item-icon'>
                        <SearchOutlined />
                    </div>
                </div>
                <div className='navbar__center'>
                    <ul className='navbar__center-list'>
                        <li className='navbar__center-item'>
                            <NavLink style={({ isActive }) => {
                                return isActive ? { color: 'red' } : {}
                            }} className="navbar__center-item-link " to="/vocabulary">
                                <FontAwesomeIcon className='navbar__item-icon' icon={faBook} />
                                Vocabulary
                            </NavLink>
                        </li>
                        <li className='navbar__center-item'>
                            <NavLink style={({ isActive }) => {
                                return isActive ? { color: 'red' } : {}
                            }} className="navbar__center-item-link " to="/grammar">
                                <FontAwesomeIcon className='navbar__item-icon' icon={faSpellCheck} />
                                Grammar
                            </NavLink>
                        </li>
                        <li className='navbar__center-item'>
                            <NavLink style={({ isActive }) => {
                                return isActive ? { color: 'red' } : {}
                            }} className="navbar__center-item-link " to="/practice">
                                <FontAwesomeIcon className='navbar__item-icon' icon={faSpellCheck} />
                                Practice
                            </NavLink>
                        </li>
                        <li className='navbar__center-item'>
                            <NavLink style={({ isActive }) => {
                                return isActive ? { color: 'red' } : {}
                            }} className="navbar__center-item-link " to="/blog">
                                <FontAwesomeIcon className='navbar__item-icon' icon={faBlog} />
                                Blog
                            </NavLink>

                        </li>
                        <li className='navbar__center-item'>
                            <NavLink style={({ isActive }) => {
                                return isActive ? { color: 'red' } : {}
                            }} className="navbar__center-item-link " to="/test">
                                <FontAwesomeIcon className='navbar__item-icon' icon={faBars} />
                                Test
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className='navbar__rigth'>
                    <div className='user'>
                        {/* <img src={userData?.image} alt="" className='user_img' /> */}
                        <img src="https://nv.edu.vn/wp-content/uploads/2020/08/english-course.jpg" alt="" className='user_img' />
                        <span className='user__name'>{userName}</span>
                    </div>
                    <div className='navbar__rigth-user-icon'>
                        <BellOutlined />
                    </div>
                    <div className='navbar__rigth-user-icon' onClick={logOut}>
                        <PoweroffOutlined className='power' />
                    </div>
                    <div className='navbar__rigth-user-icon'>
                        <MenuOutlined />
                    </div>
                </div>
            </div>
        </div>
    )
}
