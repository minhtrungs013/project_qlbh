import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import "./header.css"
import { Col, Row } from 'antd';
import { Area } from '@ant-design/plots';
import { RiseOutlined } from '@ant-design/icons';
export default function Header() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
  };



  return (
    <div className='header'>
      <Row gutter={16}>
        <Col span={8}>
          <div className='header__left' onClick={showModal}>
            <div className='header__icon'></div>
            <div className='header__icon1'></div>
            <h4 className='header__heading' >Weekly Sales</h4>
            <h2 className='header__price'>$ 15,0000</h2>
            <h6 className='header__desc'>Increased by 60% <RiseOutlined /></h6>
          </div>
        </Col>
        <Col span={8}>
          <div className='header__center'>
            <div className='header__icon'></div>
            <div className='header__icon1'></div>
            <h4 className='header__heading' onClick={showModal}>Weekly Orders</h4>
            <h2 className='header__price'>45,6334</h2>
            <h6 className='header__desc'>Decreased by 10%</h6></div>
        </Col>
        <Col span={8}>
          <div className='header__rigth'>
            <div className='header__icon'></div>
            <div className='header__icon1'></div>
            <h4 className='header__heading' onClick={showModal}>Visitors Online</h4>
            <h2 className='header__price'>95,5741</h2>
            <h6 className='header__desc'>Increased by 5%</h6>
          </div>
        </Col>
      </Row>

      <Modal title="Weekly Sales" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <Row>
          <Col span={24} className='name'>
            <Area {...config} />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}
