import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { DashboardOutlined, UserSwitchOutlined} from '@ant-design/icons';
import "./navigation.css"
// eslint-disable-next-line no-unused-vars
const { SubMenu, Item } = Menu;

const NavigationNew = (props) => {
  const { onSelect, collapsed } = props;
  const [itemSub, setItems] = useState(JSON.parse(localStorage.getItem('submenu')));
  const [defaultKey, setDefaultKey] = useState(JSON.parse(localStorage.getItem('submenu')));
  const navigate = useNavigate();


  const handleCheckBreadcrum = () => {
    let arr = [];
    localStorage.setItem('breadcrumbs', JSON.stringify(arr));
  }

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      target: '/',
    },
    {
      key: "skill",
      icon: <DashboardOutlined />,
      label: 'Practice Management',
      target: "/skill",
    },
    {
      key: "exam",
      icon: <UserSwitchOutlined />,
      label: 'Test Management',
      target: "/exam",
    },
  ]

  const onClick = (e) => {
    if (e.keyPath.length > 1) {
      localStorage.setItem('submenu', JSON.stringify(e?.keyPath[1]));
    } else {
      localStorage.setItem('submenu', JSON.stringify(e?.keyPath[0]));
    }
    handleMenuClick(e.key)
    handleCheckBreadcrum()
    setItems(e.key);
    setDefaultKey(e?.keyPath[1]);
  };

  const handleMenuClick = (key) => {
    const { target } = menuItems.find(item => item.key === key) || {}; 
    if (target) { navigate(target); } 
  };


  return (
      <div className='Navigate'>
            <div className='Navigate__heading'>
                <img src="https://vapa.vn/wp-content/uploads/2022/12/anh-dep-lam-hinh-nen-001.jpg" alt="" className='user_img' />
                {props.check ? null : (<h3>logo</h3>)}
            </div>
        <Menu
        items={menuItems}
        defaultSelectedKeys={['dashboard']}
        defaultOpenKeys={[defaultKey]}
        selectedKeys={[itemSub]}
        onClick={onClick}
        onSelect={onSelect}
        className="menu-navigation"
        inlineCollapsed={collapsed}
        mode="inline"
        trigger={null}
      />
      </div>
  );
};

NavigationNew.propTypes = {};

NavigationNew.defaultProps = {};

export default NavigationNew;
