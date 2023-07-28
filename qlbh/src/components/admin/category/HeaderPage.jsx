import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button, Typography } from 'antd';
import { CheckSquareFilled, PlusCircleOutlined } from '@ant-design/icons';
import './header.css';
const { Search } = Input;

const HeaderPage = ({ title = '', actions = 'default', onCreate, payment = false }) => {
  const onSearch = (text) => {
  };

  return (
    <div className="header-page">
      <Row className="wrapper" justify="space-around" 
// @ts-ignore
      align="center">
        <Col className="header-page__title">
          <Typography.Title level={3}>{title}</Typography.Title>
        </Col>
        <Col flex={1} style={{ textAlign: 'right' }}>
          {actions === 'default' && (
            <Row
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '16px',
                justifyContent: 'end',
              }}
            >
              <Search className="header-page__search" placeholder="Search..." onSearch={onSearch} enterButton />
              <Button type="primary" onClick={() => onCreate()} icon={<PlusCircleOutlined />}>
                {'Create'}
              </Button>
            </Row>
          ) }
        </Col>
      </Row>
    </div>
  );
};

HeaderPage.propTypes = {
  /**
   * options data for ribbon
   */
  title: PropTypes.string,
  // actions: PropTypes.oneOf([PropTypes.string, PropTypes.func, PropTypes.bool]),
  onCreate: PropTypes.func,
};

export default HeaderPage;
