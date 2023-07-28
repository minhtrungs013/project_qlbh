import React from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { BackwardOutlined } from '@ant-design/icons';

function ButtonBack({ url, ...rest }) {
  return (
    <NavLink to={url}>
      <Button icon={<BackwardOutlined />} type="primary" {...rest}>
        Back
      </Button>
    </NavLink>
  );
}

ButtonBack.propTypes = {};

export default ButtonBack;
