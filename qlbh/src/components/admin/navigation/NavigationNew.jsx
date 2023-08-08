import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { DashboardOutlined, UserSwitchOutlined, UsergroupAddOutlined, ApartmentOutlined, WechatOutlined, CameraOutlined, BookOutlined, ReadOutlined, ManOutlined, PercentageOutlined, ContainerOutlined, } from '@ant-design/icons';
import "./navigation.css"
const { SubMenu, Item } = Menu;

const NavigationNew = (props) => {
  const { onSelect, collapsed } = props;
  const [itemSub, setItems] = useState(JSON.parse(localStorage.getItem('items')));
  const [defaultKey, setDefaultKey] = useState(JSON.parse(localStorage.getItem('submenu')));
  const IconListening = "../../../img/practice/listening.png"
  const onClick = (e) => {
    localStorage.setItem('items', JSON.stringify(e.key));
    if (e.keyPath.length > 1) {
      localStorage.setItem('submenu', JSON.stringify(e?.keyPath[1]));
    } else {
      localStorage.setItem('submenu', JSON.stringify(e?.keyPath[0]));
    }
    setItems(e.key);
    setDefaultKey(e?.keyPath[1]);
  };

  return (
      <div className='Navigate'>
            <div className='Navigate__heading'>
                <img src="https://vapa.vn/wp-content/uploads/2022/12/anh-dep-lam-hinh-nen-002.jpg" alt="" className='user_img' />
                {props.check ? null : (<h3>logo</h3>)}
            </div>
        <Menu
        defaultSelectedKeys={['dashboard']}
        defaultOpenKeys={[defaultKey]}
        selectedKeys={[itemSub]}
        onClick={onClick}
        onSelect={onSelect}
        className="menu-navigation"
        inlineCollapsed={collapsed}
        mode="inline"
        trigger={null}
      >
        <Item key="/dashboard" className="Navigate__item" icon={<DashboardOutlined />}>
          <Link className="navbar__center-link" to="/dashboard">Dashboard</Link>
        </Item>

        <SubMenu
          key={'practice-sub'}
          icon={<UserSwitchOutlined />}
          title={'Practice Management'}
          className="menu-navigation__sub-menu"
        >
          <Item key="listening" className="Navigate__item" icon={<BookOutlined />}>
            <Link to="/listening">Listening</Link>
          </Item>
          <Item key="reading" className="Navigate__item" icon={<ReadOutlined />}>
            <Link to="/reading">Reading</Link>
          </Item>
          <Item key="speaking" className="Navigate__item" icon={<ManOutlined />}>
            <Link to="/speaking">Speaking</Link>
          </Item>
          <Item key="writing" className="Navigate__item" icon={<PercentageOutlined />}>
            <Link to="/writing">Writing</Link>
          </Item>
        </SubMenu>

        <Item key="practice" className="Navigate__item" icon={<WechatOutlined />}>
            <Link className="navbar__center-link" to="/practice">
                Practice
            </Link>
        </Item>
        <Item key="category" className="Navigate__item" icon={<CameraOutlined />}>
            <Link className="navbar__center-link" to="/category">
                Category
            </Link>
        </Item>
        <Item key="vocabulary" className="Navigate__item" icon={<UserSwitchOutlined />}>
            <Link className="navbar__center-link" to="/vocabulary">
                Vocabulary
            </Link>
        </Item>
        {/* <Item key="question" className="Navigate__item" icon={<UsergroupAddOutlined />}>
            <Link className="navbar__center-link" to="/question">
                Question
            </Link>
        </Item> */}
         {/* <Item key="lession" className="Navigate__item" icon={<ContainerOutlined />}>
            <Link className="navbar__center-link" to="/lession">
                Lession
            </Link>
        </Item>  */}
      </Menu>
      </div>
  );
};

NavigationNew.propTypes = {};

NavigationNew.defaultProps = {};

export default NavigationNew;
