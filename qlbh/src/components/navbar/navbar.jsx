import React from 'react'
import "./navbar.css"
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
export default function navbar() {
    return (
        <div className='navbar'>
            <div className='navbar__item'>
                <div className='search'>
                    <div className='search_icon'>
                        <MenuOutlined />
                    </div>
                    <input type="text" className='search_item' placeholder='Sreach...' />
                    <div className='search_item-icon'>
                        <SearchOutlined />
                    </div>
                </div>
                <div className='search'>
                    <div className='search_icon'>
                        <MenuOutlined />
                    </div>
                    <div className='search_icon'>
                        <MenuOutlined />
                    </div>
                    <div className='search_icon'>
                        <MenuOutlined />
                    </div>
                </div>
            </div>
        </div>
    )
}
