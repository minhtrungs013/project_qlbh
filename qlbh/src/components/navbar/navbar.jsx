import React, { useState } from 'react'
import "./navbar.css"
import { MenuOutlined, SearchOutlined, BellOutlined, PoweroffOutlined, MenuUnfoldOutlined, DownOutlined } from '@ant-design/icons';
export default function Navbar() {
    const [check, setCheck] = useState(false)

    function check1() {
        if (check === false) {
            setCheck(true)

        } else {
            setCheck(false)
        }
    }
    return (
        <div className='navbar'>
            <div className='navbar__item'>
                <div className='navbar__left'>
                    <div className='search_icon'>
                        <MenuOutlined />
                    </div>
                    <input type="text" className='search_item' placeholder='Sreach...' />
                    <div className='search_item-icon'>
                        <SearchOutlined />
                    </div>
                </div>
                <div className='navbar__rigth'>
                    <div className='user'>
                        <img src="https://i.pinimg.com/originals/91/cb/54/91cb545176720cc851687a7263984600.jpg" alt="" className='user_img' />
                        <span className='user__name'>Bích Diễm </span>
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
                        <PoweroffOutlined className='power' />
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
                                    <div class="profile">
                                        <img src="https://i.pinimg.com/originals/91/cb/54/91cb545176720cc851687a7263984600.jpg" alt="profile" />
                                        <span class="online"></span>
                                    </div>
                                    <div class="info">
                                        <p>Thomas Douglas</p>
                                        <p class="info__ac" >Available</p>
                                    </div>
                                    <small class="text-muted my-auto">19 min
                                    </small>
                                </li>
                                <li className='todo__item'>
                                    <div class="profile">
                                        <img src="https://i.pinimg.com/originals/91/cb/54/91cb545176720cc851687a7263984600.jpg" alt="profile" />
                                        <span class="online"></span>
                                    </div>
                                    <div class="info">
                                        <p>Thomas Douglas</p>
                                        <p class="info__ac" >Available</p>
                                    </div>
                                    <small class="text-muted my-auto">19 min
                                    </small>
                                </li>
                                <li className='todo__item'>
                                    <div class="profile">
                                        <img src="https://i.pinimg.com/originals/91/cb/54/91cb545176720cc851687a7263984600.jpg" alt="profile" />
                                        <span class="online"></span>
                                    </div>
                                    <div class="info">
                                        <p>Thomas Douglas</p>
                                        <p class="info__ac" >Available</p>
                                    </div>
                                    <small class="text-muted my-auto">19 min
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
