import React from 'react'
import "./header.css"
import { Col, Row } from 'antd';

export default function header() {
  return (
    <div className='header'>
      <Row gutter={16}>
        <Col span={8}>
          <div className='header__left'>
            <div className='header__icon'></div>
            <div className='header__icon1'></div>
            <h4 className='header__heading'>Weekly Sales</h4>
            <h2 className='header__price'>$ 15,0000</h2>
            <h6 className='header__desc'>Increased by 60%</h6>
          </div>
        </Col>
        <Col span={8}>
          <div className='header__center'>
            <div className='header__icon'></div>
            <div className='header__icon1'></div>
            <h4 className='header__heading'>Weekly Orders</h4>
            <h2 className='header__price'>45,6334</h2>
            <h6 className='header__desc'>Decreased by 10%</h6></div>
        </Col>
        <Col span={8}>
          <div className='header__rigth'>
            <div className='header__icon'></div>
            <div className='header__icon1'></div>
            <h4 className='header__heading'>Visitors Online</h4>
            <h2 className='header__price'>95,5741</h2>
            <h6 className='header__desc'>Increased by 5%</h6>
          </div>
        </Col>
      </Row>
    </div>
  )
}
