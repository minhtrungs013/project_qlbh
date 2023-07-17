import React, { useState, useEffect } from 'react'
import "./navbar.css"
import { useNavigate, Link } from "react-router-dom";
import { getAccountByUsernameAPI } from "../../../api/service/AuthService";
import { HomeOutlined, MenuOutlined, SearchOutlined, BellOutlined, PoweroffOutlined, DownOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faSpellCheck, faBlog, faBars } from '@fortawesome/free-solid-svg-icons';


export default function Navbar(props) {
    const [check, setCheck] = useState(false)
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const [userData, setUserData] = useState(null)

    function check1() {
        if (check === false) {
            setCheck(true)

        } else {
            setCheck(false)
        }
    }

    useEffect(() => {
        getAccountByUsernameAPI(`accounts?username=${username}`).then((res) => {
            setUserData(res.data.data);
        });
    }, []);

    const logOut = () => {
        localStorage.setItem("LoggedIn", false);
        localStorage.setItem("userID", '');
        navigate("/login");
    }
    return (
        <div className='navbar'>
            <div className='navbar__item'>
                <div className='navbar__left'>
                    <div className='Navigate__heading1'>
                        <img src="https://vapa.vn/wp-content/uploads/2022/12/anh-dep-lam-hinh-nen-002.jpg" alt="" className='user_img1' />
                    </div>
                    <input type="text" className='user__search_item' placeholder='Sreach...' />
                    <div className='user__search_item-icon'>
                        <SearchOutlined />
                    </div>
                </div>
                <div className='navbar__center'>
                    <ul className='navbar__center-list'>
                        <li className='navbar__center-item'>
                            <Link className="navbar__center-item-link " to="/vocabulary">
                                <FontAwesomeIcon className='navbar__item-icon' icon={faBook} />
                                Vocabulary
                            </Link>
                        </li>
                        <li className='navbar__center-item'>
                            <Link className="navbar__center-item-link " to="/grammar">
                                <FontAwesomeIcon className='navbar__item-icon' icon={faSpellCheck} />
                                Grammar
                            </Link>
                        </li>
                        <li className='navbar__center-item'>
                            <Link className="navbar__center-item-link " to="/blog">
                                <FontAwesomeIcon className='navbar__item-icon' icon={faBlog} />
                                Blog
                            </Link>

                        </li>
                        <li className='navbar__center-item'>
                            <Link className="navbar__center-item-link " to="/test">
                                <FontAwesomeIcon className='navbar__item-icon' icon={faBars} />
                                Test
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='navbar__rigth'>
                    <div className='user'>
                        {/* <img src={userData?.image} alt="" className='user_img' /> */}
                        <img src="https://nv.edu.vn/wp-content/uploads/2020/08/english-course.jpg" alt="" className='user_img' />
                        <span className='user__name'>{userData?.username}</span>
                    </div>
                    <div className='navbar__rigth-user-icon'>
                        <BellOutlined  />
                    </div>
                    <div className='navbar__rigth-user-icon'  onClick={logOut}>
                        <PoweroffOutlined className='power' />
                    </div>
                    <div className='navbar__rigth-user-icon'>
                        <MenuOutlined />
                    </div>
                    {/* <div className='navbar__rigth-icon'>
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
                    </div> */}
                </div>
            </div>
        </div>
    )
}
