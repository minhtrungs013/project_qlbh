import React from 'react'
import "./header.css"
import { Col, Row } from 'antd';

export default function header() {
  return (
    <div className='header'>
        <Row gutter={16}>
        <Col span={20}>
            <div>1</div>
        </Col>
        <Col span={4}>
            <div>2</div>
        </Col>
      </Row>
    </div>
  )
}
