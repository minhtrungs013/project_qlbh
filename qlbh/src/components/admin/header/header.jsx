import React, { useState, useEffect } from 'react';
import "./header.css"
import { Col, Row, Modal } from 'antd';
import { Area, Column, DualAxes } from '@ant-design/plots';
import { RiseOutlined } from '@ant-design/icons';
export default function Header() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [Open, setOpen] = useState(0);
  const showModal = (value) => {
    if (value === 1) {
      setOpen(1)
      setData(da)
    } else if (value === 2) {
      setOpen(2)
      asyncFetch();
    } else {
      setOpen(3)
      setData(da2)
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


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

  const config1 = {
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

  const config = {
    data,
    isGroup: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'name',

    /** 设置颜色 */
    // color: ['#1ca9e6', '#f88c24'],


    /** 设置间距 */
    marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };


  const da = [
    {
      name: 'dừa',
      month: 'thứ 2',
      value: 18.9,
    },
    {
      name: 'kẹo',
      month: 'thứ 3',
      value: 28.8,
    },
    {
      name: 'London',
      month: 'thứ 4',
      value: 39.3,
    },
    {
      name: 'London',
      month: 'thứ 5',
      value: 81.4,
    },
    {
      name: 'London',
      month: 'thứ 6',
      value: 47,
    },
    {
      name: 'London',
      month: 'thứ 7',
      value: 20.3,
    },
    {
      name: 'London',
      month: 'chủ nhật',
      value: 24,
    },
    {
      name: 'Berlin',
      month: 'thứ 2',
      value: 12.4,
    },
    {
      name: 'Berlin',
      month: 'thứ 3',
      value: 23.2,
    },
    {
      name: 'Berlin',
      month: 'thứ 4',
      value: 34.5,
    },
    {
      name: 'Berlin',
      month: 'thứ 5',
      value: 99.7,
    },
    {
      name: 'Berlin',
      month: 'thứ 6',
      value: 52.6,
    },
    {
      name: 'Berlin',
      month: 'thứ 7',
      value: 35.5,
    },
    {
      name: 'Berlin',
      month: 'chủ nhật',
      value: 37.4,
    },
    {
      name: 'chuối',
      month: 'thứ 2',
      value: 12.4,
    },
    {
      name: 'chuối',
      month: 'thứ 3',
      value: 23.2,
    },
    {
      name: 'chuối',
      month: 'thứ 4',
      value: 34.5,
    },
    {
      name: 'chuối',
      month: 'thứ 5',
      value: 99.7,
    },
    {
      name: 'chuối',
      month: 'thứ 6',
      value: 52.6,
    },
    {
      name: 'chuối',
      month: 'thứ 7',
      value: 35.5,
    },
    {
      name: 'chuối',
      month: 'chủ nhật',
      value: 37.4,
    },
  ];


  const da2 = [
    {
      name: 'thứ 2',
      value: 3,
      value1: 10,
      count: 10,
    },
    {
      name: 'thứ 3',
      value: 4,
      value1: 10,
      count: 4,
    },
    {
      name: 'thứ 4',
      value: 3,
      value1: 10,
      count: 5,
    },
    {
      name: 'thứ 5',
      value: 5,
      value1: 10,
      count: 5,
    },
    {
      name: 'thứ 6',
      value: 4,
      value1: 10,
      count: 4.9,
    },
    {
      name: 'thứ 7',
      value: 6,
      value1: 10,
      count: 35,
    },
    {
      name: 'chủ nhật',
      value: 7,
      value1: 10,
      count: 7,
    },
  ];
  const config2 = {
    data: [data, data, data],
    xField: 'name',
    yField: ['value', 'count', 'count'],
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9',
      },
      {
        geometry: 'line',
        color: '#5AD8A6',
      },
    ],
  };

  return (
    <div className='header'>
      <Row gutter={16}>
        <Col span={8}>
          <div className='header__left' onClick={() => showModal(1)}>
            <div className='header__icon'></div>
            <div className='header__icon1'></div>
            <h4 className='header__heading' >Weekly Sales</h4>
            <h2 className='header__price'>$ 15,0000</h2>
            <h6 className='header__desc'>Increased by 60% <RiseOutlined /></h6>
          </div>
        </Col>
        <Col span={8}>
          <div className='header__center' onClick={() => showModal(2)}>
            <div className='header__icon'></div>
            <div className='header__icon1'></div>
            <h4 className='header__heading'>Weekly Orders</h4>
            <h2 className='header__price'>45,6334</h2>
            <h6 className='header__desc'>Decreased by 10%</h6></div>
        </Col>
        <Col span={8}>
          <div className='header__rigth' onClick={() => showModal(3)}>
            <div className='header__icon'></div>
            <div className='header__icon1'></div>
            <h4 className='header__heading' >Visitors Online</h4>
            <h2 className='header__price'>95,5741</h2>
            <h6 className='header__desc'>Increased by 5%</h6>
          </div>
        </Col>
      </Row>

      <Modal title={Open === 1 ? ("Weekly Sales") : Open === 2 ? ("Weekly Orders") : ("Visitors Online")} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <Row>
          <Col span={24} className='name'>
            {Open === 1 ? (<Column {...config} />) : Open === 2 ? (<Area {...config1} />) : (<DualAxes {...config2} />)
            }
          </Col>
        </Row>
      </Modal>
    </div>
  )
}
