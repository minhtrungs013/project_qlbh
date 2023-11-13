import { PoweroffOutlined, ProfileOutlined } from '@ant-design/icons';
import { faBars, faBlog, faBook, faPen, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from '../../commom/messageConstant';
import { setLoggedIn, setUser } from '../redux/_actions/user.actions';
import "./navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [check, setCheck] = useState(false)
    const role = useSelector(state => state.userReducer.role);


    /**
     * Log out the user by clearing user data and changing the login status.
     *
     * This function dispatches actions to set the user to null and the login status to false.
     * It also navigates the user to the login page.
     */
    const logOut = () => {
        localStorage.removeItem(ACCESS_TOKEN)
        dispatch(setUser(null))
        dispatch(setLoggedIn(false))
        navigate("/login");
    }


    function showMenu() {
        setCheck(!check)
    }

    return (

        <div className='navbar_user navbar_user-mb'>
            <div className='navbar__item'>
                <div className=' navbar__tablet-mobile navbar__pc'>
                    <div className='menu' onClick={() => showMenu()}>
                        <FontAwesomeIcon className='navbar__tablet-mobile-icon ' icon={faBars} />
                    </div>
                    <div className={check === true ? 'cancel showcancel' : 'cancel'} onClick={() => showMenu()}></div>
                    <div className={check === true ? 'todo todo1 ' : 'todo'} >
                        <ul className='todo__list'>
                            <li className='todo__item'>
                                <NavLink style={({ isActive }) => {
                                    return isActive ? { color: 'red' } : {}
                                }} className="navbar__center-item-link  navbar__center-item-link-tm" to="/vocabulary" onClick={() => showMenu()}>
                                    <FontAwesomeIcon className='navbar__item-icon' icon={faBook} />
                                    Vocabulary
                                </NavLink>
                            </li>
                            <li className='todo__item'>
                                <NavLink style={({ isActive }) => {
                                    return isActive ? { color: 'red' } : {}
                                }} className="navbar__center-item-link navbar__center-item-link-tm" to="/grammar" onClick={() => showMenu()}>
                                    <FontAwesomeIcon className='navbar__item-icon' icon={faSpellCheck} />
                                    Grammar
                                </NavLink>
                            </li>
                            <li className='todo__item'>
                                <NavLink style={({ isActive }) => {
                                    return isActive ? { color: 'red' } : {}
                                }} className="navbar__center-item-link navbar__center-item-link-tm" to="/practice" onClick={() => showMenu()}>
                                    <FontAwesomeIcon className='navbar__item-icon' icon={faPen} />
                                    Practice
                                </NavLink>
                            </li>
                            <li className='todo__item'>
                                <NavLink style={({ isActive }) => {
                                    return isActive ? { color: 'red' } : {}
                                }} className="navbar__center-item-link navbar__center-item-link-tm" to="/test" onClick={() => showMenu()}>
                                    <FontAwesomeIcon className='navbar__item-icon' icon={faBars} />
                                    Test
                                </NavLink>
                            </li>
                            <li className='todo__item'>
                                <NavLink style={({ isActive }) => {
                                    return isActive ? { color: 'red' } : {}
                                }} className="navbar__center-item-link navbar__center-item-link-tm" to="/blog" onClick={() => showMenu()}>
                                    <FontAwesomeIcon className='navbar__item-icon' icon={faBlog} />
                                    Blog
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className='navbar__left'>
                    <div className='Navigate__heading1'>
                        <NavLink to="/">
                            <img src="https://estudyme.com/_next/image/?url=%2Fimages%2Fapp%2Festudyme%2Ficon-support-3d.png&w=256&q=100" alt="" className='user_img1' />
                        </NavLink>
                    </div>
                </div>
                {role === 'User' && <>
                    <div className='navbar__center hide-on-mobile-tablet'>
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
                                    <FontAwesomeIcon className='navbar__item-icon' icon={faPen} />
                                    Practice
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
                            <li className='navbar__center-item'>
                                <NavLink style={({ isActive }) => {
                                    return isActive ? { color: 'red' } : {}
                                }} className="navbar__center-item-link " to="/blog">
                                    <FontAwesomeIcon className='navbar__item-icon' icon={faBlog} />
                                    Blog
                                </NavLink>

                            </li>
                        </ul>
                    </div>
                </>
                }
                <div className='navbar__rigth'>
                    <div className='user'>
                        <img src="https://lh3.googleusercontent.com/a/ACg8ocKyWGHnSoxDB7M0Gjo-bTf_1RRLDxHV3MqtHM4B2gfuyg=s96-c" alt="" className='user_img' />
                        <div className='user_Profile_body'>
                            <ul className='user_Profile'>
                                <li>
                                    <NavLink to="/profile">
                                        <div className='navbar__rigth-user-icon'>
                                            <span className='user_Profile-text'>Profile</span>
                                            <ProfileOutlined style={{ color: "orange" }} />
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <div className='navbar__rigth-user-icon' onClick={logOut}>
                                        <span className='user_Profile-text'>LogOut</span>
                                        <PoweroffOutlined style={{ color: "red" }} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
