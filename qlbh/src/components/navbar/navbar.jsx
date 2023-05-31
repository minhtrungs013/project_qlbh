import React, { useState, useEffect } from 'react'
import "./navbar.css"
import {  useNavigate } from "react-router-dom";
import { getUserById } from "../../api/service/UserService";

import { MenuOutlined, SearchOutlined, BellOutlined, PoweroffOutlined, MenuUnfoldOutlined, DownOutlined } from '@ant-design/icons';
export default function Navbar(props) {
    const [check, setCheck] = useState(false)
    const navigate = useNavigate();
    const userId = localStorage.getItem("userID");
    const [userData, setUserData] = useState(null)

    function check1() {
        if (check === false) {
            setCheck(true)

        } else {
            setCheck(false)
        }
    }

    useEffect(() => {
        getUserById(`user/${userId}`).then((res) => {
            setUserData(res.data);
        });
      }, []);

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
                    <input type="text" className='search_item' placeholder='Sreach...' />
                    <div className='search_item-icon'>
                        <SearchOutlined />
                    </div>
                </div>
                <div className='navbar__rigth'>
                    <div className='user'>
                        <img src={userData?.image} alt="" className='user_img' />
                        <span className='user__name'>{userData?.lastname + ' ' + userData?.firstname  }</span>
                        <DownOutlined className='user__icon' />
                        <div className='user__list'>aaa</div>
                    </div>
                    <div className='navbar__rigth-icon'>
                        <MenuOutlined />
                    </div>
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
