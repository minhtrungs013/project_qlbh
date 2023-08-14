import React, { useState } from 'react'
import "./navbar.css"
import {  useNavigate } from "react-router-dom";
// import { getAccountByUsernameAPI } from "../../../api/service/AuthService";
import { useSelector } from 'react-redux';

import { MenuOutlined, SearchOutlined, BellOutlined, PoweroffOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
export default function Navbar(props) {
    const [check, setCheck] = useState(false)
    const navigate = useNavigate();
    const userName = useSelector(state => state.userReducer.userName);


    function check1() {
        if (check === false) {
            setCheck(true)

        } else {
            setCheck(false)
        }
    }



    const logOut = () => {
        localStorage.setItem("LoggedIn",false);
        localStorage.setItem("userID",'');
        navigate("/login");
    }
    return (
        <div className='navbar'>
            <div className='navbar__item'>
                <div className='navbar__left'>
                    <div className='search_icon'>
                        <MenuOutlined onClick={props.onClick}/>
                    </div>
                    <input type="text" className='search_item' placeholder='Search...' />
                    <div className='search_item-icon'>
                        <SearchOutlined />
                    </div>
                </div>
                <div className='navbar__rigth'>
                    <div className='user'>
                        <img src='https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg' alt="" className='user_img' />
                        <span className='user__name'>{userName}</span>
                        {/* <DownOutlined className='user__icon' /> */}
                        {/* <div className='user__list'>aaa</div> */}
                    </div>
                    {/* <div className='navbar__rigth-icon'>
                        <MenuOutlined />
                    </div> */}
                    <div className='navbar__rigth-icon'>
                        <BellOutlined />
                    </div>
                    <div className='navbar__rigth-icon'>
                        <PoweroffOutlined className='power'  onClick={logOut}/>
                    </div>
                    <div className='navbar__rigth-icon'>
                        <MenuUnfoldOutlined className='MenuUnfold ' onClick={() => check1()} />
                        <div className={check === true ? 'todo todo1 ' : 'todo'} >
                            <div className='todo__heading' >
                                <div>aa
                                </div>
                                <div>aa
                                </div>
                            </div>
                            <ul className='todo__list'>
                                <li className='todo__item'>
                                    <div className="profile">
                                        <img src="https://vapa.vn/wp-content/uploads/2022/12/anh-dep-lam-hinh-nen-002.jpg" alt="profile" />
                                        <span className="online"></span>
                                    </div>
                                    <div className="info">
                                        <p>Thomas Douglas</p>
                                        <p className="info__ac" >Available</p>
                                    </div>
                                    <small className="text-muted my-auto">19 min
                                    </small>
                                </li>
                                <li className='todo__item'>
                                    <div className="profile">
                                        <img src="https://vapa.vn/wp-content/uploads/2022/12/anh-dep-lam-hinh-nen-002.jpg" alt="profile" />
                                        <span className="online"></span>
                                    </div>
                                    <div className="info">
                                        <p>Thomas Douglas</p>
                                        <p className="info__ac" >Available</p>
                                    </div>
                                    <small className="text-muted my-auto">19 min
                                    </small>
                                </li>
                                <li className='todo__item'>
                                    <div className="profile">
                                        <img src="https://vapa.vn/wp-content/uploads/2022/12/anh-dep-lam-hinh-nen-002.jpg" alt="profile" />
                                        <span className="online"></span>
                                    </div>
                                    <div className="info">
                                        <p>Thomas Douglas</p>
                                        <p className="info__ac" >Available</p>
                                    </div>
                                    <small className="text-muted my-auto">19 min
                                    </small>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
